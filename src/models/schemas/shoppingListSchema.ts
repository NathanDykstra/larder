import Joi from "joi";
import { shoppingListItemSchema } from "./shoppingListItemSchema";

/**
 * Database schema for the Shopping List model.
 */
export const shoppingListSchema = Joi.object({
    Id: Joi.number(),
    Description: Joi.string(),
    Items: Joi.array().items(shoppingListItemSchema)
});