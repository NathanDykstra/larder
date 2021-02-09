import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '@models/Item';
import { ShoppingList } from '@models/ShoppingList';
import { shoppingListItemSchema } from './schemas/shoppingListItemSchema';

/**
 * An individual item on a shopping list.
 */
@Entity({name: 'ShoppingListItem'})
export class ShoppingListItem {

    @PrimaryGeneratedColumn('increment')
    Id: number;

    @ManyToOne(() => ShoppingList, shopList => shopList.Items, {nullable: false, eager: true, cascade: true})
    @JoinColumn({name: 'ShoppingListId'})
    ShoppingList: ShoppingList;

    @OneToOne(() => Item, {nullable: false, eager: true})
    @JoinColumn({name: 'ItemBarcode'})
    Item: Item;

    @Column()
    Quantity: number;

    /**
     *
     * @param id
     * @param quantity
     */
    constructor(
        id: number = -1,
        quantity: number = 1,
    ) {
        this.Id = id;
        this.Quantity = quantity;
    }

    /**
     * Deserializes the JSON into a ShoppingList.
     * @param data
     */
    static fromJson = (json: any) => {
        const { error, value } = shoppingListItemSchema.validate(json);

        if (!error) {
            const shoppingListItem = value as ShoppingListItem;
            return new ShoppingListItem(
                shoppingListItem.Id,
                shoppingListItem.Quantity
            );
        }

        throw error;
    }
}