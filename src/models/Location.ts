import Joi from 'joi';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Database schema for the location model.
 */
const schema = Joi.object({
    Id: Joi.number(),
    Symbol: Joi.string().required(),
    Description: Joi.string(),
});

/**
 * Represents a Location.
 */
@Entity({name: 'Location'})
export class Location {

    @PrimaryGeneratedColumn('increment')
    Id: number;

    @Column()
    Name: string;

    @Column({nullable: true})
    Description: string;

    /**
     * Instantiates a new instance of the Location class.
     * @param Id
     * @param Name
     * @param Description
     */
    constructor(
        id: number = -1,
        name: string = '',
        description: string | undefined = undefined,
    ) {
        this.Id = id;
        this.Name = name;
        this.Description = description;
    }

    /**
     * Deserializes JSON data into a Location object.
     * @param json
     */
    static fromJson = (json: any) => {
        const { error, value } = schema.validate(json);

        if (json) {
            const location = value as Location;
            
            return new Location(
                location.Id,
                location.Name,
                location.Description
            );
        }

        throw error;
    }
}