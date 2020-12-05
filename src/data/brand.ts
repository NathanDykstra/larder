import { Brand } from '@models/Brand';
import { DeleteResult, getRepository, InsertResult, UpdateResult } from 'typeorm';

/**
 * Gets the Brand record by ID.
 * @param id The ID of the record.
 */
export const getBrand = (id: number): Promise<Brand> => {
    return getRepository(Brand).findOneOrFail(id);
};

/**
 * Saves the Brand.
 * @param brand
 */
export const saveBrand = (brand: Brand): Promise<InsertResult> => {
    return new Promise((resolve, reject) => {
        getBrand(brand.Id)
            .then(_ => {
                // record found, can't add
                reject(`A Brand with that Id already exists`);
            })
            .catch(_ => {
                // item not found, add it
                brand.Id = undefined;
                resolve(getRepository(Brand).insert(brand));
            });
    });
}

/**
 * Updates the Brand,
 * @param uom The brand record.
 */
export const updateBrand = (brand: Brand): Promise<UpdateResult> => {
    return getRepository(Brand).update(brand.Id, brand);
}

/**
 * Deletes the brand.
 * @param id The ID of the record to delete
 */
export const deleteBrand = (id: number): Promise<DeleteResult> => {
    return getRepository(Brand).delete(id);
}