import { deleteItemType, getItemType, saveItemType, updateItemType } from '@data/itemType';
import { ItemType } from '@models/ItemType';
import { logger } from '@util/logger';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { ValidationError } from 'joi';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Configure the routes for accessing ItemType data.
 * @param app The express app.
 */
export const registerItemTypeRoutes = (app: express.Application) => {

    /**
     * Gets a ItemType.
     */
    app.get('/itemType/:id', (req, res) => {
        logger.debug('get ItemType', req.params);

        getItemType(Number(req.params.id))
            .then(itemType => {
                if (itemType) {
                    res.json(itemType).status(HttpStatus.OK);
                } else {
                    res.json({error: `No ItemType by that ID was found`}).status(HttpStatus.NOT_FOUND);
                }
            })
            .catch(error => {
                res.json(error).status(HttpStatus.BAD_REQUEST);
            });
    });

    /**
     * Adds a ItemType.
     */
    app.post('/itemType', (req, res) => {
        logger.debug('add ItemType', req.body);

        try {
            // validate input is actually a uom
            const itemType = ItemType.fromJson(req.body);
            saveItemType(itemType)
                .then((inserted: InsertResult) => {
                    res.status(HttpStatus.OK).json(inserted.identifiers[0]);
                })
                .catch(error => {
                    res.status(HttpStatus.CONFLICT).json(error);
                });
        } catch (error) {
            const { details } = error as ValidationError;
            res.status(HttpStatus.BAD_REQUEST).json(details);
        }
    });

    /**
     * Updates the ItemType record.
     */
    app.put('/itemType', (req, res) => {
        logger.debug('update ItemType', req.body);

        try {
            const itemType = ItemType.fromJson(req.body);

            updateItemType(itemType)
                .then((updated: UpdateResult) => {
                    res.status(HttpStatus.OK).json(updated);
                })
                .catch(error => {
                    res.status(HttpStatus.CONFLICT).json(error);
                });
        } catch (error) {
            const { details } = error as ValidationError;
            res.status(HttpStatus.BAD_REQUEST).json(details);
        }
    });

    /**
     * Deletes the ItemType.
     */
    app.delete('/itemType/:id', (req, res) => {
        logger.debug('delete ItemType', req.params);

        deleteItemType(Number(req.params.id))
            .then((deleted: DeleteResult) => {
                res.status(HttpStatus.OK).json(deleted);
            })
            .catch(error => {
                logger.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            });
    });
}