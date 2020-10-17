import dotenv from 'dotenv';
import { logger, TypeOrmLogger } from '@util/logger';
import { Item } from '@models/Item';
import { Connection, createConnection, DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

dotenv.config();
const dbType: any = process.env.DB_TYPE;

/**
 * Currently supported database types.
 */
const supportedDatabases = ['mysql', 'mssql'];

/**
 * The database connection.
 */
let dbConnection: Connection;

/**
 * Repository for accessing Item data.
 */
export let itemRepository: Repository<Item>;

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
            type: dbType,
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [
                Item
            ],
            synchronize: true,
            logger: new TypeOrmLogger()
        }).then(connection => {
            logger.info('Database connected');
            dbConnection = connection;

            itemRepository = dbConnection.getRepository(Item);
        }).catch(error => {
            logger.error('Unable to connect to MySQL Server');
            logger.error(error);
        });
    }
};