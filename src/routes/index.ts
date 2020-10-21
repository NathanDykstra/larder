import * as express from 'express';
import { logger } from '@util/logger';
import { errors } from '@data/connection';
import { registerItemRoutes } from '@routes/itemRoutes';
import { registerUomRoutes } from './uomRoutes';
import { registerLocationRoutes } from './locationRoutes';
import { registerBrandRoutes } from './brandRoutes';
import { registerItemTypeRoutes } from './itemTypeRoutes';

/**
 * Configures the routes that the app should handle.
 * @param app The express app.
 */
export const register = (app: express.Application) => {

    registerItemRoutes(app);

    registerUomRoutes(app);

    registerLocationRoutes(app);

    registerBrandRoutes(app);

    registerItemTypeRoutes(app);

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
     * Catch all redirects to main page.
     */
    app.get('*', (req, res) => {
        logger.warn(`request received to unhandled route ${req.path}`);

        res.redirect('/');
    });
};