import { IUnitOfMeasure, UnitOfMeasure } from '@models/UnitOfMeasure';
import { uomRepository } from '@data/connection';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Gets the Unit of Measure record by ID.
 * @param id The ID of the record.
 */
export const getUom = (id: number): Promise<UnitOfMeasure> => {
    return uomRepository.findOneOrFail(id);
};

/**
 * Saves the UoM.
 * @param uom
 */
export const saveUom = (uom: IUnitOfMeasure): Promise<InsertResult> => {
    return new Promise((resolve, reject) => {
        getUom(uom.Id)
            .then(_ => {
                // item found, can't add
                reject(`A Unit of Measure with that Id already exists`);
            })
            .catch(_ => {
                // item not found, add it
                uom.Id = undefined;
                resolve(uomRepository.insert(uom));
            });
    });
}

/**
 * Updates the unit of measure.
 * @param uom The unit of measure record.
 */
export const updateUom = (uom: IUnitOfMeasure): Promise<UpdateResult> => {
    return uomRepository.update(uom.Id, uom);
}

/**
 * Deletes the unit of measure
 * @param id The ID of the record to delete
 */
export const deleteUom = (id: number): Promise<DeleteResult> => {
    return uomRepository.delete(id);
}