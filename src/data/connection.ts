import dotenv from 'dotenv';
import { logger } from '../util/logger';
import { IItem, Item } from '../models/Item';
import { Connection, createConnection } from 'typeorm';

dotenv.config();
const dbType = process.env.DB_TYPE;

/**
 * Currently supported database types.
 */
const supportedDatabases = ['mysql', 'mssql'];

/**
 * The database connection.
 */
let dbConnection: Connection;

/**
 * Errors from any database operations.
 */
export let errors: string[] = [];

/**
 * Connects to the database.
 */
export const connectDatabase = () => {
    if (supportedDatabases.indexOf(dbType) < 0) {
        errors.push(`Unsupported database type ${dbType}. Cannot communicate with database.`);
    } else {
        createConnection({
            type: 'mysql',
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [
                Item
            ],
            synchronize: true
        }).then(connection => {
            logger.info('Database connected');
            dbConnection = connection;
        }).catch(error => {
            logger.error('Unable to connect to MySQL Server');
            logger.error(error);
        });
    }
};

/**
 * Looks up product info for the given barcode.
 * @param barcode The barcode to search for.
 */
export const getItem = (barcode: string): Promise<Item> => {
    return dbConnection.getRepository(Item).findOne(barcode);
};

/**
 * Adds the item to the database of known items.
 * @param item The item to add.
 */
export const addItemToLibrary = (item: IItem): Promise<Item> => {
    return new Promise((resolve, reject) => {
        getItem(item.Barcode)
        .then(_ =>{
            // item found, can't add
            reject(`An item with that barcode already exists`);
        })
        .catch(_ => {
            // item not found, add it
            resolve(dbConnection.getRepository(Item).save(item));
        });
    });
}