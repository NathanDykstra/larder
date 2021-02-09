import Joi from "joi";

/**
 * Database schema for the ItemType model.
 */
export const itemTypeSchema = Joi.object({
    Id: Joi.number(),
    Name: Joi.string().required(),
    Description: Joi.string(),
});