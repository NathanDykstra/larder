import { Brand } from "../../models/Brand";
import { expect } from "chai";

describe('fromJson', () => {
    it('bad schema', () => {
        const json = {
            Id: 123,
            Description: 'Bad json'
        };

        expect(() => Brand.fromJson(json)).to.throw();
    });

    it('deserialize object', () =>{
        const json = {
            Id: 123,
            Name: 'Brand name'
        };

        const result = Brand.fromJson(json);
        expect(result instanceof Brand).to.be.true;
        expect(result.Id).to.equal(json.Id);
        expect(result.Name).to.equal(json.Name);
    });
});