import dotenv from 'dotenv';
import { logger, TypeOrmLogger } from '@util/logger';
import { Item } from '@models/Item';
import { Location } from '@models/Location';
import { createConnection } from 'typeorm';
import { UnitOfMeasure } from '@models/UnitOfMeasure';
import { Brand } from '@models/Brand';
import { ItemType } from '@models/ItemType';
import { ShoppingList } from '@models/ShoppingList';
import { ShoppingListItem } from '@models/ShoppingListItem';

dotenv.config();
const dbType: any = process.env.DB_TYPE;

/**
 * Errors from any database operations.
 */
export let errors: string[] = [];

// configure typeorm log levels; all logging in dev
const dbLoggingLevels: any[] = ['error'];
if (process.env.NODE_ENV === 'development') {
    dbLoggingLevels.push('all');
}

/**
 * Connects to the database.
 */
export const connectDatabase = () => {
    createConnection({
        type: dbType,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [
            Item,
            UnitOfMeasure,
            Location,
            Brand,
            ItemType,
            ShoppingList,
            ShoppingListItem
        ],
        synchronize: true,
        logger: new TypeOrmLogger(),
        logging: dbLoggingLevels
    }).then(_ => {
        logger.info('Database connected');
    }).catch(error => {
        logger.error('Unable to connect to database server');
        logger.error(error);
    });
};