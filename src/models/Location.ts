import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { locationSchema } from './schemas/locationSchema';

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
        const { error, value } = locationSchema.validate(json);

        if (!error) {
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