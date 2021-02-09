import Joi from "joi";

/**
 * Database schema for the Item model.
 */
export const itemSchema = Joi.object({
    Barcode: Joi.string().required(),
    Name: Joi.string(),
    Description: Joi.string(),
    Quantity: Joi.number().required(),
    UoMId: Joi.number().required(),
    BrandId: Joi.number().required(),
    TypeId: Joi.number().required(),
    Note: Joi.string()
})