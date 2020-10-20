import { Item } from '@models/Item';
import { InsertResult, DeleteResult, UpdateResult } from 'typeorm';
import { itemRepository } from '@data/connection';

/**
 * Gets the item from the library.
 * @param barcode The barcode to search for.
 */
export const getItem = (barcode: string): Promise<Item> => {
    return itemRepository.findOneOrFail(barcode);
};

/**
 * Adds the item to the library.
 * @param item The item to add.
 */
export const saveItemToLibrary = (item: Item): Promise<InsertResult> => {
    return new Promise((resolve, reject) => {
        getItem(item.Barcode)
            .then(_ => {
                // item found, can't add
                reject(`An item with that barcode already exists`);
            })
            .catch(_ => {
                // item not found, add it
                resolve(itemRepository.insert(item));
            });
    });
}

/**
 * Deletes the item from the library.
 * @param barcode The barcode of the item to remove from the master library.
 */
export const deleteItemFromLibrary = (barcode: string): Promise<DeleteResult> => {
    return itemRepository.delete(barcode);
}

/**
 * Updates the item in the library.
 * @param item The item to update.
 */
export const updateItemInLibrary = (item: Item): Promise<UpdateResult> => {
    return itemRepository.update(item.Barcode, item);
}