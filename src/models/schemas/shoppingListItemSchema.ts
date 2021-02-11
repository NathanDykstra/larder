import Joi from "joi";
import { itemSchema } from "./itemSchema";

/**
 * Database schema for the Shopping List Item model.
 */
export const shoppingListItemSchema = Joi.object({
    Id: Joi.number(),
    ShoppingList: Joi.number(),
    Item: itemSchema,
    Quantity: Joi.number()
});