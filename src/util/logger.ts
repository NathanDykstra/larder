import winston from "winston";
import dotenv from "dotenv";
import { Logger, QueryRunner } from 'typeorm';

dotenv.config();

/**
 * Default logger.
 */
export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'larder_error.log',
            level: 'error',
            format: winston.format.combine(winston.format.logstash(), winston.format.timestamp())
        }),
        new winston.transports.File({
            filename: 'larder.log',
            level: process.env.LOG_LEVEL,
            format: winston.format.combine(winston.format.logstash(), winston.format.timestamp())
        })
    ],
});

/**
 * Add console log in non-production environment.
 */
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: 'debug'
    }));
}

/**
 * Custom logger for use in typeorm.
 */
export class TypeOrmLogger implements Logger {

    logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
        logger.info('typeorm query', {query, parameters});
    }

    logQueryError(error: string, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
        logger.error('typeorm error', {error, query, parameters});
    }

    logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
        logger.warn('typeorm slow query', {time, query, parameters});
    }

    logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
        logger.info('typeorm schema build', {message});
    }

    logMigration(message: string, _queryRunner?: QueryRunner) {
        logger.info('typeorm migration', {message});
    }

    log(level: 'info' | 'log' | 'warn', message: any, _queryRunner?: QueryRunner) {
        switch (level) {
            case 'info':
                logger.info('typeorm log', {message});
                break;
            case 'log':
                logger.debug('typeorm log', {message});
                break;
            case 'warn':
                logger.warn('typeorm log', {message});
                break;
            default:
                break;
        }
    }

}