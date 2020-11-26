import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { ShoppingList } from './ShoppingList';

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

    constructor(
        id: number = -1,
        quantity: number = 1,
    ) {
        this.Id = id;
        this.Quantity = quantity;
    }
}