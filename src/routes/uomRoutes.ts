import { deleteUom, getUom, saveUom, updateUom } from '@data/uom';
import { UnitOfMeasure } from '@models/UnitOfMeasure';
import { logger } from '@util/logger';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { ValidationError } from 'joi';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Configure the routes for accessing Unit of Measure data.
 * @param app The express app.
 */
export const registerUomRoutes = (app: express.Application) => {

    /**
     *
     */
    app.get('/uom/:id', (req, res) => {
        logger.debug('get uom', req.params);

        getUom(Number(req.params.id))
            .then(uom => {
                if (uom) {
                    res.json(uom).status(HttpStatus.OK);
                } else {
                    res.json({error: `No unit of measure by that ID was found`}).status(HttpStatus.NOT_FOUND);
                }
            })
            .catch(error => {
                res.json(error).status(HttpStatus.BAD_REQUEST);
            });
    });

    /**
     * Adds a uom.
     */
    app.post('/uom', (req, res) => {
        logger.debug('add uom', req.body);

        try {
            // validate input is actually a uom
            const uom = UnitOfMeasure.fromJson(req.body);
            saveUom(uom)
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
     * Updates the UoM record.
     */
    app.put('/uom', (req, res) => {
        logger.debug('update uom', req.body);

        try {
            const uom = UnitOfMeasure.fromJson(req.body);

            updateUom(uom)
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
     * Deletes the unit of measure.
     */
    app.delete('/uom/:id', (req, res) => {
        logger.debug('delete uom', req.params);

        deleteUom(Number(req.params.id))
            .then((deleted: DeleteResult) => {
                res.status(HttpStatus.OK).json(deleted);
            })
            .catch(error => {
                logger.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            });
    });
}