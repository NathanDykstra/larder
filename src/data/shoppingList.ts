import { ShoppingList } from '@models/ShoppingList';
import { shoppingListRepository } from '@data/connection';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Gets the Shopping List record by ID.
 * @param id The ID of the record.
 */
export const getShoppingList = (id: number): Promise<ShoppingList> => {
    return shoppingListRepository.findOneOrFail(id);
};

/**
 * Saves the ShoppingList.
 * @param shoppingList
 */
export const saveShoppingList = (shoppingList: ShoppingList): Promise<InsertResult> => {
    return new Promise((resolve, reject) => {
        getShoppingList(shoppingList.Id)
            .then(_ => {
                // item found, can't add
                reject(`A Shopping List with that Id already exists`);
            })
            .catch(_ => {
                // item not found, add it
                shoppingList.Id = undefined;
                resolve(shoppingListRepository.insert(shoppingList));
            });
    });
}

/**
 * Updates the shopping list.
 * @param shoppingList The shopping list record.
 */
export const updateShoppingList = (shoppingList: ShoppingList): Promise<UpdateResult> => {
    return shoppingListRepository.update(shoppingList.Id, shoppingList);
}

/**
 * Deletes the shopping list
 * @param id The ID of the record to delete
 */
export const deleteShoppingList = (id: number): Promise<DeleteResult> => {
    return shoppingListRepository.delete(id);
}