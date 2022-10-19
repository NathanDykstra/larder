import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { ShoppingList } from './ShoppingList';
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
        shoppingList: ShoppingList,
        item: Item
    ) {
        this.Id = id;
        this.Quantity = quantity;
        this.ShoppingList = shoppingList;
        this.Item = item;
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
                shoppingListItem.Quantity,
                shoppingListItem.ShoppingList,
                shoppingListItem.Item
            );
        }

        throw error;
    }
}