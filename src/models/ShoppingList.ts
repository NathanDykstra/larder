import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingListItem } from '@models/ShoppingListItem';
import { shoppingListSchema } from './schemas/shoppingListSchema';

/**
 * A shopping list for keeping track of items to purchase.
 */
@Entity({name: 'ShoppingList'})
export class ShoppingList {

    @PrimaryGeneratedColumn('increment')
    Id: number;
    
    Items: ShoppingListItem[];

    @Column()
    Description: string;

    /**
     *
     * @param id
     */
    constructor(
        id: number = -1,
        description: string = '',
        items: ShoppingListItem[] = []
    ) {
        this.Id = id;
        this.Description = description;
        this.Items = items;
    }

    /**
     * Deserializes the JSON into a ShoppingList.
     * @param data
     */
    static fromJson = (json: any) => {
        const { error, value } = shoppingListSchema.validate(json);

        if (!error) {
            const shoppingList = value as ShoppingList;
            return new ShoppingList(
                shoppingList.Id,
                shoppingList.Description,
                shoppingList.Items,
            );
        }

        throw error;
    }
}