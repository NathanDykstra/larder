import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingList } from './ShoppingList';

@Entity({name: 'ShoppingListItem'})
export class ShoppingListItem {

    @PrimaryGeneratedColumn('increment')
    Id: number;

    @ManyToOne(() => ShoppingList, shopList => shopList.Items, {nullable: false, eager: true, cascade: true})
    @JoinColumn({name: 'ShoppingListId'})
    shoppingList: ShoppingList;

    constructor(
        id: number = -1,
    ) {
        this.Id = id;
    }
}