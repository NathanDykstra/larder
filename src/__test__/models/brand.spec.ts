import { Brand } from "@models/Brand";
import { expect } from "chai";

describe('fromJson', () => {
    it('deserialize object', () =>{
        const json = {
            Id: 123,
            Name: 'Brand name'
        };

        const result = Brand.fromJson(json);
        expect(result).to.be.a('Brand');
        expect(result.Id).to.equal(json.Id);
        expect(result.Name).to.be(json.Name);
    });

    it('bad schema', () => {
        const json = {
            Id: 123,
            Description: 'Bad json'
        };

        expect(() => Brand.fromJson(json)).throws();
    });
});