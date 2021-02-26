import Joi from "joi";

/**
 * Database schema for the Brand model.
 */
export const brandSchema = Joi.object({
    Id: Joi.number(),
    Name: Joi.string().required()
});