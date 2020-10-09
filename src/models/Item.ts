import * as Joi from 'joi';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
@Entity({name: 'Item'})
export class Item implements IItem {

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