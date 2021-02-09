import Joi from "joi";

/**
 * Database schema for the location model.
 */
export const locationSchema = Joi.object({
    Id: Joi.number(),
    Name: Joi.string().required(),
    Description: Joi.string(),
});