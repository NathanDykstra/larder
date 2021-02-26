import Joi from "joi";

/**
 * Database schema for the UoM model.
 */
export const unitOfMeasureSchema = Joi.object({
    Id: Joi.number(),
    Symbol: Joi.string().required(),
    Description: Joi.string(),
});