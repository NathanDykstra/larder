import { getLocation, saveLocation, updateLocation, deleteLocation } from '@data/location';
import { Location } from '@models/Location';
import { logger } from '@util/logger';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { ValidationError } from 'joi';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Configure the routes for accessing location data.
 * @param app The express app.
 */
export const registerLocationRoutes = (app: express.Application) => {

    /**
     * Gets a location.
     */
    app.get('/location/:id', (req, res) => {
        logger.debug('get location', req.params);

        getLocation(Number(req.params.id))
            .then(location => {
                if (location) {
                    res.json(location).status(HttpStatus.OK);
                } else {
                    res.json({error: `No unit of measure by that ID was found`}).status(HttpStatus.NOT_FOUND);
                }
            })
            .catch(error => {
                res.json(error).status(HttpStatus.BAD_REQUEST);
            });
    });

    /**
     * Adds a location.
     */
    app.post('/location', (req, res) => {
        logger.debug('add location', req.body);

        try {
            // validate input is actually a uom
            const location = Location.fromJson(req.body);
            saveLocation(location)
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
     * Updates the location record.
     */
    app.put('/location', (req, res) => {
        logger.debug('update location', req.body);

        try {
            const location = Location.fromJson(req.body);

            updateLocation(location)
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
     * Deletes the location.
     */
    app.delete('/location/:id', (req, res) => {
        logger.debug('delete location', req.params);

        deleteLocation(Number(req.params.id))
            .then((deleted: DeleteResult) => {
                res.status(HttpStatus.OK).json(deleted);
            })
            .catch(error => {
                logger.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            });
    });
}