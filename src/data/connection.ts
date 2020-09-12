import dotenv from 'dotenv';
import { logger } from '../util/logger';
import * as mysql from 'mysql';
import * as mssql from 'mssql';
import * as sqlString from 'sqlstring';
import { Item } from '../models/Item';

dotenv.config();
const dbType = process.env.DB_TYPE;

/**
 * The MySQL connection.
 */
let mysqlConnection: mysql.Connection;

/**
 * The MS SQL connection.
 */
let mssqlPool: mssql.ConnectionPool;

export let errors: string[] = [];

/**
 * Connects to the database.
 */
export const connectDatabase = () => {
    switch (dbType) {
        case 'mysql':
            connectMySql();
            break;
        case 'mssql':
            connectMsSql();
            break;
        default:
            errors.push(`Unsupported database type ${dbType}. Cannot communicate with database.`);
            break;
    }
};

//#region Connecting functions

/**
 * Connects to the MS-SQL database.
 */
const connectMsSql = () => {
    mssqlPool = new mssql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME
    });

    mssqlPool.connect(err =>{
        if (err) {
            logger.error('Unable to connect to SQL Server');
            logger.error(err);
            process.exit();
        }
        logger.info('Database connected');
    });
}

/**
 * Connects to the MySQL database.
 */
const connectMySql = () => {
    mysqlConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    mysqlConnection.connect((err) => {
        if (err) {
            logger.error('Unable to connect to MySQL Server');
            logger.error(err);
            process.exit();
        }
        logger.info('Database connected');
    });
}

//#endregion

/**
 * Looks up product info for the given barcode.
 * @param barcode The barcode to search for.
 */
export const lookupBarcode = (barcode: string, onSuccess: (item: Item) => void, onError: (errorMessage: string) => void) => {
    const query = sqlString.format('SELECT * FROM Item WHERE Barcode = ?', [barcode]);

    switch (dbType) {
        case 'mysql':
            mysqlConnection.query(query, (err, results) => {
                if (err) {
                    onError(err.message);
                    return;
                }

                if (results.length !== 1) {
                    const msg = `Found ${results.length} for barcode search ${barcode}`;
                    logger.warn(msg);
                    onError(msg);
                    return;
                }

                const item = Item.fromJson(results[0]);
                onSuccess(item);
            });
            break;
        case 'mssql':
            const request = new mssql.Request();
            request.query(query, (err, result) => {
                if (err) throw err;
                logger.info('results', result);
            });
            break;
    }
};

/**
 * Adds the item to the database of known items.
 * @param item The item to add.
 * @param onSuccess Optional callback when the insert succeeds.
 * @param onError Optional callback to handle errors.
 */
export const addItemToLibrary = (item: Item, onSuccess?: () => void, onError?: (errorMessage: string) => void) => {
    // consider using something like objection.js for model mapping
    switch (dbType) {
        case 'mysql':
            break;
        case 'mssql':
            break;
    }
}