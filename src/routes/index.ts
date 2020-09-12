import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { logger } from '../util/logger';
import { lookupBarcode, errors } from '../data/connection';
import { Item } from '../models/Item';

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

        lookupBarcode(req.params.barcode, (item: Item) =>{
            res.json(item).status(HttpStatus.OK);
        }, (errorMsg: string) => {
            res.json({error: errorMsg}).status(HttpStatus.NOT_FOUND);
        });
    });

    /**
     * Adds an item to the master inventory list.
     */
    app.put('/addItem', (req, res) => {
        logger.debug('addItem', req.body);

        res.status(HttpStatus.OK).send();
    });

    /**
     * Catch all redirects to main page.
     */
    app.get('*', (req, res) => {
        logger.warn(`request received to unhandled route ${req.path}`);

        res.redirect('/');
    });
};