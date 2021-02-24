import { ShoppingListItem } from "../../models/ShoppingListItem";
import { expect } from "chai";

describe('fromJson', () => {
    it('bad schema', () => {
        const json = {
            Id: 123,
            ShoppingList: 1,
            Invalid: 'Invalid'
        };

        expect(() => ShoppingListItem.fromJson(json)).to.throw();
    });

    it('deserialize object', () =>{
        const json = {
            Id: 123,
            ShoppingList: 1,
            Item: {
                Barcode: '123',
                Name: 'Item name',
                Description: 'Description',
                Quantity: 5,
                UoMId: 1,
                BrandId: 2,
                TypeId: 3,
                Note: 'Note'
            },
            Quantity: 10
        };

        const result = ShoppingListItem.fromJson(json);
        expect(result instanceof ShoppingListItem).to.be.true;
        expect(result.Id).to.equal(json.Id);
        expect(result.Quantity).to.equal(json.Quantity);
        expect(result.ShoppingList).to.equal(json.ShoppingList);
    });
});