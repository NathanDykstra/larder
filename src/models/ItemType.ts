/**
 * Interface for the ItemType class.
 */
export interface IItemType {
    Id: number,
    Name: string,
    Description: string
}

/**
 * Represents an ItemType.
 */
export class ItemType {

    /**
     * Instantiates a new instance of an ItemType.
     * @param Id
     * @param Name
     * @param Description
     */
    constructor(
        public Id: number = -1,
        public Name: string = '',
        public Description: string = ''
    ) { }

    /**
     * Deserializes the JSON into an ItemType.
     * @param json
     */
    static fromJson = (json: ItemType) => {
        if (json) {
            return new ItemType(
                json.Id,
                json.Name,
                json.Description
            );
        }

        return new ItemType();
    }
}