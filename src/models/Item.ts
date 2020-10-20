import * as Joi from 'joi';
import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Database schema for the Item model.
 */
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
 * Represents an Item.
 */
@Entity({name: 'Item'})
export class Item {

    @PrimaryColumn()
    Barcode: string;

    @Column()
    Name: string;

    @Column({nullable: true})
    Description: string;

    @Column({nullable: true})
    Quantity: number;

    @Column({nullable: true})
    UoMId: number;

    @Column({nullable: true})
    BrandId: number;

    @Column({nullable: true})
    TypeId: number;

    @Column({nullable: true})
    Note: string;

    /**
     * Instantiates a new instance of an Item.
     */
    constructor(
        barcode: string = '',
        name: string = '',
        description: string | undefined = undefined,
        quantity: number = -1,
        uomId: number = -1,
        brandId: number = -1,
        typeId: number = -1,
        note: string | undefined = undefined,
    ) {
        this.Barcode = barcode;
        this.Name = name;
        this.Description = description;
        this.Quantity = quantity;
        this.UoMId = uomId;
        this.BrandId = brandId;
        this.TypeId = typeId;
        this.Note = note;
     }

    /**
     * Deserializes the JSON into an Item.
     * @param json
     */
    static fromJson = (json: any) => {
        const { error, value } = schema.validate(json);

        if (!error) {
            const item = value as Item;
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