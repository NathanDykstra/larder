import { expect } from "chai";
import { Location } from "../../models/Location";

describe('fromJson', () => {
    it('bad schema', () => {
        const json = {
            Id: 123,
            Description: 'Missing name'
        };

        expect(() => Location.fromJson(json)).to.throw();
    });

    it('deserialize object', () =>{
        const json = {
            Id: 123,
            Name: 'Location Name',
            Description: 'Test Description'
        };

        const result = Location.fromJson(json);
        expect(result instanceof Location).to.be.true;
        expect(result.Id).to.equal(json.Id);
        expect(result.Name).to.equal(json.Name);
        expect(result.Description).to.equal(json.Description);
    });
});