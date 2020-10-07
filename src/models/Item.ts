import * as Joi from 'joi';

const schema = Joi.object({
    Barcode: Joi.string().required(),
    Name: Joi.string(),
    Description: Joi.string(),
    Quantity: Joi.number().required(),
    UoMId: Joi.number().required(),
    BrandId: Joi.number().required(),
    TypeId: Joi.number().required(),
    Note: Joi.string()
})

/**
 * Interface for the Item class.
 */
export interface IItem {
    Barcode: string,
    Name: string,
    Description: string | undefined,
    Quantity: number,
    UoMId: number,
    BrandId: number,
    TypeId: number,
    Note: string | undefined
}

/**
 * Represents an Item.
 */
export class Item implements IItem {

    /**
     * Instantiates a new instance of an Item.
     * @param Barcode
     * @param Name
     * @param Description
     * @param Quantity
     * @param UoMId
     * @param BrandId
     * @param TypeId
     * @param Note
     */
    constructor(
        public Barcode: string = '',
        public Name: string = '',
        public Description: string | undefined = undefined,
        public Quantity: number = -1,
        public UoMId: number = -1,
        public BrandId: number = -1,
        public TypeId: number = -1,
        public Note: string | undefined = undefined,
    ) { }

    /**
     * Deserializes the JSON into an Item.
     * @param json
     */
    static fromJson = (json: any) => {
        const { error, value } = schema.validate(json);

        if (!error) {
            const item = value as IItem;
            return new Item(
                item.Barcode,
                item.Name,
                item.Description,
                item.Quantity,
                item.UoMId,
                item.BrandId,
                item.TypeId,
                item.Note
            );
        }

        throw error;
    }
}