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

    it('deserialize object', () =>{
        const json = {
            Id: 123,
            Description: 'Description',
            Items: new Array<object>(),
        };

        const result = ShoppingList.fromJson(json);
        expect(result instanceof ShoppingList).to.be.true;
        expect(result.Id).to.equal(json.Id);
        expect(result.Description).to.equal(json.Description);
    });
});