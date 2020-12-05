import { UnitOfMeasure } from '@models/UnitOfMeasure';
import { DeleteResult, getRepository, InsertResult, UpdateResult } from 'typeorm';

/**
 * Gets the Unit of Measure record by ID.
 * @param id The ID of the record.
 */
export const getUom = (id: number): Promise<UnitOfMeasure> => {
    return getRepository(UnitOfMeasure).findOneOrFail(id);
};

/**
 * Saves the UoM.
 * @param uom
 */
export const saveUom = (uom: UnitOfMeasure): Promise<InsertResult> => {
    return new Promise((resolve, reject) => {
        getUom(uom.Id)
            .then(_ => {
                // item found, can't add
                reject(`A Unit of Measure with that Id already exists`);
            })
            .catch(_ => {
                // item not found, add it
                uom.Id = undefined;
                resolve(getRepository(UnitOfMeasure).insert(uom));
            });
    });
}

/**
 * Updates the unit of measure.
 * @param uom The unit of measure record.
 */
export const updateUom = (uom: UnitOfMeasure): Promise<UpdateResult> => {
    return getRepository(UnitOfMeasure).update(uom.Id, uom);
}

/**
 * Deletes the unit of measure
 * @param id The ID of the record to delete
 */
export const deleteUom = (id: number): Promise<DeleteResult> => {
    return getRepository(UnitOfMeasure).delete(id);
}