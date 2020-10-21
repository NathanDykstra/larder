import { deleteBrand, getBrand, saveBrand, updateBrand } from '@data/brand';
import { Brand } from '@models/Brand';
import { logger } from '@util/logger';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { ValidationError } from 'joi';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Configure the routes for accessing brand data.
 * @param app The express app.
 */
export const registerBrandRoutes = (app: express.Application) => {

    /**
     * Gets a location.
     */
    app.get('/brand/:id', (req, res) => {
        logger.debug('get brand', req.params);

        getBrand(Number(req.params.id))
            .then(brand => {
                if (brand) {
                    res.json(brand).status(HttpStatus.OK);
                } else {
                    res.json({error: `No unit of measure by that ID was found`}).status(HttpStatus.NOT_FOUND);
                }
            })
            .catch(error => {
                res.json(error).status(HttpStatus.BAD_REQUEST);
            });
    });

    /**
     * Adds a brand.
     */
    app.post('/brand', (req, res) => {
        logger.debug('add brand', req.body);

        try {
            // validate input is actually a brand
            const brand = Brand.fromJson(req.body);
            saveBrand(brand)
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
     * Updates the brand record.
     */
    app.put('/brand', (req, res) => {
        logger.debug('update brand', req.body);

        try {
            const brand = Brand.fromJson(req.body);

            updateBrand(brand)
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
     * Deletes the brand.
     */
    app.delete('/brand/:id', (req, res) => {
        logger.debug('delete brand', req.params);

        deleteBrand(Number(req.params.id))
            .then((deleted: DeleteResult) => {
                res.status(HttpStatus.OK).json(deleted);
            })
            .catch(error => {
                logger.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            });
    });
}