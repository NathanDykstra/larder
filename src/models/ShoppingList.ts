import Joi from 'joi';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingListItem } from '@models/ShoppingListItem';

/**
 * Database schema for the Shopping List model.
 */
const schema = Joi.object({
    Id: Joi.number(),
});

@Entity({name: 'ShoppingList'})
export class ShoppingList {

    @PrimaryGeneratedColumn('increment')
    Id: number;
    
    @OneToMany(() => ShoppingListItem, shopListItem => shopListItem.ShoppingList)
    Items: ShoppingListItem[];

    constructor(
        id: number = -1,
    ) {
        this.Id = id;
    }

    /**
     * Deserializes the JSON into a ShoppingList.
     * @param data
     */
    static fromJson = (json: any) => {
        const { error, value } = schema.validate(json);

        if (json) {
            const shoppingList = value as ShoppingList;
            return new ShoppingList(
                shoppingList.Id
            );
        }

        throw error;
    }
}