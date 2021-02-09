import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { brandSchema } from './schemas/brandSchema';

/**
 * Represents a Brand.
 */
@Entity({name: "Brand"})
export class Brand {

    @PrimaryGeneratedColumn('increment')
    Id: number;

    @Column()
    Name: string;

    /**
     * Instantiates a new instance of the Brand class.
     * @param id
     * @param name
     */
    constructor(
        id: number = -1,
        name: string = '',
    ) {
        this.Id = id;
        this.Name = name;
    }

    /**
     * Deserializes the JSON into an Brand.
     * @param json
     */
    static fromJson = (json: any) => {
        const { error, value } = brandSchema.validate(json);

        if (!error) {
            const brand = value as Brand;
            
            return new Brand(
                brand.Id,
                brand.Name
            );
        }

        throw error;
    }
}