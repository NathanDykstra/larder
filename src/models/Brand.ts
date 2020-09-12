/**
 * Interface for the Brand class.
 */
export interface IBrand {
    Id: number,
    Name: string
}

/**
 * Represents a Brand.
 */
export class Brand {
    constructor(
        public Id: number = -1,
        public Name: string = ''
    ){}

    /**
     * Deserializes the JSON into an Brand.
     * @param json
     */
    static fromJson = (json: IBrand) => {
        if (json) {
            return new Brand(
                json.Id,
                json.Name
            );
        }

        return new Brand();
    }
}