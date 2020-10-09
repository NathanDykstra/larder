import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { logger } from '../util/logger';
import { lookupBarcode, errors, addItemToLibrary } from '../data/connection';
import { Item } from '../models/Item';
import { ValidationError } from 'joi';

/**
 * Configures the routes that the app should handle.
 * @param app The express app.
 */
export const register = (app: express.Application) => {
    /**
     * Gets the start page for larder.
     */
    app.get( '/', ( req, res ) => {
        logger.debug('/');

        const pugData = {
            windowUrl: req.protocol + '://' + req.get('host') + `/lookup/088354548300`,
            errors
        };

        res.render('index', pugData);
    });

    /**
     * Looks up the product by barcode and sends back the data.
     */
    app.get('/lookup/:barcode', (req, res) => {
        logger.debug('lookup', req.params);

        lookupBarcode(req.params.barcode)
            .then(item => {
                if (item) {
                    res.json(item).status(HttpStatus.OK);
                } else {
                    res.json({error: `No item by that barcode was found`}).status(HttpStatus.NOT_FOUND);
                }
            })
            .catch(error => {
                res.json({error}).status(HttpStatus.BAD_REQUEST);
            });
    });

    /**
     * Adds an item to the master inventory list.
     */
    app.put('/addItem', (req, res) => {
        logger.debug('addItem', req.body);

        try {
            // validate input is actually an item
            const item = Item.fromJson(req.body);
            addItemToLibrary(item)
            .then(inserted => {
                res.status(HttpStatus.OK).json(inserted);
            })
            .catch(error => {
                res.status(HttpStatus.CONFLICT).json({error});
            })
        } catch (error) {
            const { details } = error as ValidationError;
            res.status(HttpStatus.BAD_REQUEST).json(details);
        }
    });

    /**
     * Catch all redirects to main page.
     */
    app.get('*', (req, res) => {
        logger.warn(`request received to unhandled route ${req.path}`);

        res.redirect('/');
    });
};