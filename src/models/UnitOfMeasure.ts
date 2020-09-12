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
export class UnitOfMeasure {

    /**
     * Instantiates a new instance of UnitOfMeasure.
     * @param Id
     * @param Symbol
     * @param Description
     */
    constructor(
       public Id: number = -1,
       public Symbol: string = '',
       public Description: string = ''
    ) {}

    /**
     * Deserializes the JSON into a UnitOfMeasure.
     * @param data
     */
    static fromJson = (data: IUnitOfMeasure) => {
        if (data) {
            return new UnitOfMeasure(
                data.Id,
                data.Symbol,
                data.Description
            );
        }

        return new UnitOfMeasure();
    }
}