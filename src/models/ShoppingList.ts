import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingListItem } from './ShoppingListItem';

@Entity({name: 'ShoppingList'})
export class ShoppingList {

    @PrimaryGeneratedColumn('increment')
    Id: number;
    
    @ManyToOne(() => ShoppingList, shopList => shopList.Items)
    Items: ShoppingListItem[];

    constructor(
        id: number = -1,
    ) {
        this.Id = id;
    }
}