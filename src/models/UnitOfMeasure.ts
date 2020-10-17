import Joi from 'joi';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

/**
 * Database schema for the UoM model.
 */
const schema = Joi.object({
    Id: Joi.number(),
    Symbol: Joi.string().required(),
    Description: Joi.string(),
});

/**
 * Interface for UnitOfMeasure
 */
export interface IUnitOfMeasure {
    Id: number,
    Symbol: string,
    Description: string
}

/**
 * Represents a unit of measure.
 */
@Unique(["Symbol"])
@Entity({name: 'UnitOfMeasure'})
export class UnitOfMeasure implements IUnitOfMeasure {

    @PrimaryGeneratedColumn('increment')
    Id: number;

    @Column()
    Symbol: string;

    @Column({nullable: true})
    Description: string;

    /**
     * Instantiates a new instance of UnitOfMeasure.
     * @param Id
     * @param Symbol
     * @param Description
     */
    constructor(
        id: number = -1,
        symbol: string = '',
        description: string | undefined = undefined,
    ) {
        this.Id = id;
        this.Symbol = symbol;
        this.Description = description;
    }

    /**
     * Deserializes the JSON into a UnitOfMeasure.
     * @param data
     */
    static fromJson = (json: IUnitOfMeasure) => {
        const { error, value } = schema.validate(json);

        if (json) {
            const uom = value as UnitOfMeasure;
            return new UnitOfMeasure(
                uom.Id,
                uom.Symbol,
                uom.Description
            );
        }

        throw error;;
    }
}