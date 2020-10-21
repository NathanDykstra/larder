import Joi from 'joi';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Database schema for the ItemType model.
 */
const schema = Joi.object({
    Id: Joi.number(),
    Name: Joi.string().required(),
    Description: Joi.string(),
});

/**
 * Represents an ItemType.
 */
@Entity({name: 'ItemType'})
export class ItemType {

    @PrimaryGeneratedColumn('increment')
    Id: number;

    @Column()
    Name: string;

    @Column({nullable: true})
    Description: string;

    /**
     * Instantiates a new instance of an ItemType.
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
     * Deserializes the JSON into an ItemType.
     * @param json
     */
    static fromJson = (json: any) => {
        const { error, value } = schema.validate(json);

        if (json) {
            const itemType = value as ItemType;
            
            return new ItemType(
                itemType.Id,
                itemType.Name,
                itemType.Description
            );
        }

        throw error;
    }
}