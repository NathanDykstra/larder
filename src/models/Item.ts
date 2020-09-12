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
export class Item {

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
        public Type: number = -1,
        public Note: string | undefined = undefined,
    ) { }

    /**
     * Deserializes the JSON into an Item.
     * @param json
     */
    static fromJson = (json: IItem) => {
        if (json) {
            return new Item(
                json.Barcode,
                json.Name,
                json.Description,
                json.Quantity,
                json.UoMId,
                json.BrandId,
                json.TypeId,
                json.Note
            );
        }

        return new Item();
    }
}