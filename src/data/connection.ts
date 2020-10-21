import dotenv from 'dotenv';
import { logger, TypeOrmLogger } from '@util/logger';
import { Item } from '@models/Item';
import { Location } from '@models/Location';
import { Connection, createConnection, Repository } from 'typeorm';
import { UnitOfMeasure } from '@models/UnitOfMeasure';
import { Brand } from '@models/Brand';
import { ItemType } from '@models/ItemType';

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
                Item,
                UnitOfMeasure,
                Location,
                Brand,
                ItemType
            ],
            synchronize: true,
            logger: new TypeOrmLogger()
        }).then(connection => {
            logger.info('Database connected');
            dbConnection = connection;

            itemRepository = dbConnection.getRepository(Item);
            uomRepository = dbConnection.getRepository(UnitOfMeasure);
            locationRepository = dbConnection.getRepository(Location);
            brandRepository = dbConnection.getRepository(Brand);
            itemTypeRepository = dbConnection.getRepository(ItemType);
        }).catch(error => {
            logger.error('Unable to connect to database server');
            logger.error(error);
        });
    }
};