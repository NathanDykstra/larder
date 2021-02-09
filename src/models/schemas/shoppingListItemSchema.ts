import Joi from "joi";

/**
 * Database schema for the Shopping List Item model.
 */
export const shoppingListItemSchema = Joi.object({
    Id: Joi.number(),
    ShoppingList: Joi.number(),
    Item: Joi.array(),
    Quantity: Joi.number()
});