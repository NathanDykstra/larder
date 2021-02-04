import { expect } from "chai";
import { UnitOfMeasure } from "../../models/UnitOfMeasure";

describe('fromJson', () => {
    it('bad schema', () => {
        const json = {
            Id: 123,
            Description: 'Description'
        };

        expect(() => UnitOfMeasure.fromJson(json)).to.throw();
    });

    it('deserialize object', () =>{
        const json = {
            Id: 123,
            Symbol: 'lbs',
            Description: 'Description'
        };

        const result = UnitOfMeasure.fromJson(json);
        expect(result instanceof UnitOfMeasure).to.be.true;
        expect(result.Id).to.equal(json.Id);
        expect(result.Symbol).to.equal(json.Symbol);
        expect(result.Description).to.equal(json.Description);
    });
});