import { expect } from "chai";
import { ItemType } from "../../models/ItemType";

describe('fromJson', () => {
    it('bad schema', () => {
        const json = {
            Id: 123,
            Notes: 'Bad schema'
        };

        expect(() => ItemType.fromJson(json)).to.throw();
    });

    it('deserialize object', () =>{
        const json = {
            Id: 123,
            Name: 'Item Type',
            Description: 'Description'
        };

        const result = ItemType.fromJson(json);
        expect(result instanceof ItemType).to.be.true;
        expect(result.Name).to.equal(json.Name);
        expect(result.Description).to.equal(json.Description);
    });
});