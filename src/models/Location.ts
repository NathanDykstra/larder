/**
 * Interface for the Location class.
 */
export interface ILocation {
    Id: number,
    Name: string,
    Description: string
}

/**
 * Represents a Location.
 */
export class Location {

    /**
     * Instantiates a new instance of the Location class.
     * @param Id
     * @param Name
     * @param Description
     */
    constructor(
        public Id: number = -1,
        public Name: string = '',
        public Description: string = ''
    ) {}

    /**
     * Deserializes JSON data into a Location object.
     * @param json
     */
    static fromJson = (json: ILocation) => {
        if (json) {
            return new Location(
                json.Id,
                json.Name,
                json.Description
            );
        }

        return new Location();
    }
}