import { itemTypeRepository } from '@data/connection';
import { ItemType } from '@models/ItemType';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Gets the ItemType record by ID.
 * @param id The ID of the record.
 */
export const getItemType = (id: number): Promise<ItemType> => {
    return itemTypeRepository.findOneOrFail(id);
};

/**
 * Saves the ItemType.
 * @param ItemType
 */
export const saveItemType = (itemType: ItemType): Promise<InsertResult> => {
    return new Promise((resolve, reject) => {
        getItemType(itemType.Id)
            .then(_ => {
                // record found, can't add
                reject(`A ItemType with that Id already exists`);
            })
            .catch(_ => {
                // item not found, add it
                itemType.Id = undefined;
                resolve(itemTypeRepository.insert(itemType));
            });
    });
}

/**
 * Updates the ItemType,
 * @param uom The ItemType record.
 */
export const updateItemType = (itemType: ItemType): Promise<UpdateResult> => {
    return itemTypeRepository.update(itemType.Id, itemType);
}

/**
 * Deletes the ItemType.
 * @param id The ID of the record to delete
 */
export const deleteItemType = (id: number): Promise<DeleteResult> => {
    return itemTypeRepository.delete(id);
}