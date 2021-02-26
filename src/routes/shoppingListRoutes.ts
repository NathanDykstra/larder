import { deleteShoppingList, getShoppingList, saveShoppingList, updateShoppingList } from '@data/shoppingList';
import { ShoppingList } from '@models/ShoppingList';
import { logger } from '@util/logger';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { ValidationError } from 'joi';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Configure the routes for accessing Shopping List data.
 * @param app The express app.
 */
export const registerShoppingListRoutes = (app: express.Application) => {

    /**
     *
     */
    app.get('/shoppingList/:id', (req, res) => {
        logger.debug('get shopping list', req.params);

        getShoppingList(Number(req.params.id))
            .then(shoppingList => {
                if (shoppingList) {
                    res.json(shoppingList).status(HttpStatus.OK);
                } else {
                    res.json({error: `No shopping list by that ID was found`}).status(HttpStatus.NOT_FOUND);
                }
            })
            .catch(error => {
                res.json(error).status(HttpStatus.BAD_REQUEST);
            });
    });

    /**
     * Adds a shopping list.
     */
    app.post('/shoppingList', (req, res) => {
        logger.debug('add shopping list', req.body);

        try {
            // validate input is actually a shopping list
            const shoppingList = ShoppingList.fromJson(req.body);
            saveShoppingList(shoppingList)
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
     * Updates the shopping list record.
     */
    app.put('/shoppingList', (req, res) => {
        logger.debug('update shopping list', req.body);

        try {
            const shoppingList = ShoppingList.fromJson(req.body);

            updateShoppingList(shoppingList)
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
     * Deletes the shopping list.
     */
    app.delete('/shoppingList/:id', (req, res) => {
        logger.debug('delete shopping list', req.params);

        deleteShoppingList(Number(req.params.id))
            .then((deleted: DeleteResult) => {
                res.status(HttpStatus.OK).json(deleted);
            })
            .catch(error => {
                logger.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            });
    });
}