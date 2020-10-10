import dotenv from 'dotenv';
import { logger } from '../util/logger';
import { IItem, Item } from '../models/Item';
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
let itemRepository: Repository<Item>;

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
            synchronize: true
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

/**
 * Gets the item from the library.
 * @param barcode The barcode to search for.
 */
export const getItem = (barcode: string): Promise<Item> => {
    return itemRepository.findOneOrFail(barcode);
};

/**
 * Adds the item to the library.
 * @param item The item to add.
 */
export const saveItemToLibrary = (item: IItem): Promise<InsertResult> => {
    return new Promise((resolve, reject) => {
        getItem(item.Barcode)
            .then(_ => {
                // item found, can't add
                reject(`An item with that barcode already exists`);
            })
            .catch(_ => {
                // item not found, add it
                resolve(itemRepository.insert(item));
            });
    });
}

/**
 * Deletes the item from the library.
 * @param barcode The barcode of the item to remove from the master library.
 */
export const deleteItemFromLibrary = (barcode: string): Promise<DeleteResult> => {
    return itemRepository.delete(barcode);
}

/**
 * Updates the item in the library.
 * @param item The item to update.
 */
export const updateItemInLibrary = (item: IItem): Promise<UpdateResult> => {
    return itemRepository.update(item.Barcode, item);
}