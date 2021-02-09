import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { unitOfMeasureSchema } from './schemas/unitOfMeasureSchema';

/**
 * Represents a unit of measure.
 */
@Unique(["Symbol"])
@Entity({name: 'UnitOfMeasure'})
export class UnitOfMeasure {

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
    static fromJson = (json: any) => {
        const { error, value } = unitOfMeasureSchema.validate(json);

        if (!error) {
            const uom = value as UnitOfMeasure;
            return new UnitOfMeasure(
                uom.Id,
                uom.Symbol,
                uom.Description
            );
        }

        throw error;
    }
}