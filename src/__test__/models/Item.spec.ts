import { expect } from "chai";
import { Item } from "../../models/Item";

describe('fromJson', () => {
    it('bad schema', () => {
        const json = {
            Barcode: '123',
            Description: 'Bad json'
        };

        expect(() => Item.fromJson(json)).to.throw();
    });

    it('deserialize object', () =>{
        const json = {
            Barcode: '123',
            Name: 'Item name',
            Description: 'Description',
            Quantity: 5,
            UoMId: 1,
            BrandId: 2,
            TypeId: 3,
            Note: 'Note'
        };

        const result = Item.fromJson(json);
        expect(result instanceof Item).to.be.true;
        expect(result.Barcode).to.equal(json.Barcode);
        expect(result.Name).to.equal(json.Name);
        expect(result.Description).to.equal(json.Description);
        expect(result.Quantity).to.equal(json.Quantity);
        expect(result.UoMId).to.equal(json.UoMId);
        expect(result.BrandId).to.equal(json.BrandId);
        expect(result.TypeId).to.equal(json.TypeId);
        expect(result.Note).to.equal(json.Note);
    });
});