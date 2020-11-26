import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingListItem } from './ShoppingListItem';

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
}