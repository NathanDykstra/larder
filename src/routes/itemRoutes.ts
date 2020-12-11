import * as express from 'express';
import { logger } from '@util/logger';
import { Item } from '@models/Item';
import { ValidationError } from 'joi';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import * as HttpStatus from 'http-status-codes';
import { deleteItemFromLibrary, getItem, saveItemToLibrary, updateItemInLibrary } from '@data/item';

/**
 * Configure the routes for accessing Item data.
 * @param app The express app.
 */
export const registerItemRoutes = (app: express.Application) => {

    /**
     * Looks up the product by barcode and sends back the data.
     */
    app.get('/item/:barcode', (req, res) => {
        logger.debug('get item', req.params);

        getItem(req.params.barcode)
            .then(item => {
                if (item) {
                    res.json(item).status(HttpStatus.OK);
                } else {
                    res.json({error: `No item by that barcode was found`}).status(HttpStatus.NOT_FOUND);
                }
            })
            .catch(error => {
                res.json(error).status(HttpStatus.BAD_REQUEST);
            });
    });

    /**
     * Adds an item to the master inventory list.
     */
    app.post('/item', (req, res) => {
        logger.debug('add item', req.body);

        try {
            // validate input is actually an item
            const item = Item.fromJson(req.body);
            saveItemToLibrary(item)
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
     * Updates an existing Item in the library.
     */
    app.put('/item', (req, res) => {
        logger.debug('update item', req.body);

        try {
            const item = Item.fromJson(req.body);

            updateItemInLibrary(item)
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
     * Deletes the Item from the library.
     */
    app.delete('/item/:barcode', (req, res) => {
        logger.debug('delete item', req.params);

        deleteItemFromLibrary(req.params.barcode)
            .then((deleted: DeleteResult) => {
                res.status(HttpStatus.OK).json(deleted);
            })
            .catch(error => {
                logger.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            });
    });
}