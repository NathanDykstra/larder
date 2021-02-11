import { ShoppingListItem } from "../../models/ShoppingListItem";
import { expect } from "chai";
import { ShoppingList } from "../../models/ShoppingList";

describe('fromJson', () => {
    it('bad schema', () => {
        const json = {
            Id: 123,
            Invalid: 'Invalid',
        };

        expect(() => ShoppingList.fromJson(json)).to.throw();
    });

    it('bad item schema', () => {
        const json = {
            Id: 123,
            Description: 'Description',
            Items: [
                1,
                'One'
            ],
        };

        expect(() => ShoppingList.fromJson(json)).to.throw();
    });

    it('deserialize object', () =>{
        const json = {
            Id: 123,
            Description: 'Description',
            Items: [
                {
                    Id: 234,
                    Item: {
                        Barcode: '0123456789',
                        Quantity: 1,
                        UoMId: 1,
                        BrandId: 2,
                        TypeId: 3
                    },
                    Quantity: 5,
                    ShoppingList: 1
                }
            ],
        };

        const result = ShoppingList.fromJson(json);
        expect(result instanceof ShoppingList).to.be.true;
        expect(result.Id).to.equal(json.Id);
        expect(result.Description).to.equal(json.Description);
    });
});