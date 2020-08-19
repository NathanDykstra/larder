import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { logger } from '../util/logger';

/**
 * Configures the routes that the app should handle.
 * @param app The express app.
 */
export const register = ( app: express.Application ) => {
    /**
     * Gets the start page for larder.
     */
    app.get( '/', ( req, res ) => {
        logger.debug('/');

        const pugData = {
            windowUrl: req.protocol + '://' + req.get('host') + `/lookup/088354548300`
        };

        // TODO: check that the database was initialized and return index if good, error if not
        res.render('index', pugData);
    });

    /**
     * Looks up the product by barcode and sends back the data.
     */
    app.get('/lookup/:barcode', (req, res) => {
        logger.debug('lookup', req.params);

        res.json({barcode: req.params.barcode}).status(HttpStatus.OK);
    });

    /**
     * Catch all redirects to main page.
     */
    app.get('*', (req, res) => {
        logger.warn(`request received to unhandled route ${req.path}`);

        res.redirect('/');
    });
};