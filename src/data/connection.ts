import dotenv from 'dotenv';
import { logger, TypeOrmLogger } from '@util/logger';
import { Item } from '@models/Item';
import { Location } from '@models/Location';
import { Connection, createConnection, Repository } from 'typeorm';
import { UnitOfMeasure } from '@models/UnitOfMeasure';
import { Brand } from '@models/Brand';
import { ItemType } from '@models/ItemType';
import { ShoppingList } from '@models/ShoppingList';
import { ShoppingListItem } from '@models/ShoppingListItem';

dotenv.config();
const dbType: any = process.env.DB_TYPE;

/**
 * The database connection.
 */
let dbConnection: Connection;

/**
 * Repository for accessing Item data.
 */
export let itemRepository: Repository<Item>;

/**
 * Repository for accessing UoM data.
 */
export let uomRepository: Repository<UnitOfMeasure>;

/**
 * Repository for accessing Location data.
 */
export let locationRepository: Repository<Location>;

/**
 * Repository for accessing Brand data.
 */
export let brandRepository: Repository<Brand>;

/**
 * Repository for accessing ItemType data.
 */
export let itemTypeRepository: Repository<ItemType>;

/**
 * Repository for accesing ShoppingList data.
 */
export let shoppingListRepository: Repository<ShoppingList>;

/**
 * Repository for accessing ShoppingListItem data.
 */
export let shoppingListItemRepository: Repository<ShoppingListItem>;

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
    return createConnection({
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
    }).then(connection => {
        dbConnection = connection;
        itemRepository = dbConnection.getRepository(Item);
        uomRepository = dbConnection.getRepository(UnitOfMeasure);
        locationRepository = dbConnection.getRepository(Location);
        brandRepository = dbConnection.getRepository(Brand);
        itemTypeRepository = dbConnection.getRepository(ItemType);
        shoppingListRepository = dbConnection.getRepository(ShoppingList);
        shoppingListItemRepository = dbConnection.getRepository(ShoppingListItem);
        logger.info('Database connected');
    }).catch(error => {
        logger.error('Unable to connect to database server');
        logger.error(error);
    });
};