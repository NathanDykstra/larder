import { server } from '../index';
import * as HttpStatus from 'http-status-codes';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe("add item", () => {
	it("tests add item", () => {
        return chai.request(server)
            .post('/item')
            .send({
                Barcode: "1234",
                Name: "Test Name",
                Description: "Test Description",
                Quantity: "32",
                UoMId: "1",
                Note: "This is a note",
                BrandId: 1,
                TypeId: 1
            })
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.have.property('Barcode').equal('1234');
            });
	});
});

describe("get item", () => {
	it("tests get item", () => {
        return chai.request(server)
            .get('/item/1234')
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.have.property('Name').equal("Test Name");
                chai.expect(res.body).to.have.property('Barcode').equal("1234");
                chai.expect(res.body).to.have.property('Description').equal("Test Description");
                // tslint:disable-next-line:no-magic-numbers
                chai.expect(res.body).to.have.property('Quantity').equal(32);
                chai.expect(res.body).to.have.property('Note').equal("This is a note");
            });
	});
});

describe("update item", () => {
	it("tests update item", () => {
        return chai.request(server)
            .put('/item')
            .send({
                Barcode: "1234",
                Name: "Test Name Update",
                Description: "Test Description",
                Quantity: "32",
                UoMId: "1",
                Note: "This is a note",
                BrandId: 1,
                TypeId: 1
            })
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.text).to.not.be.empty;
            });
	});
});

describe("delete item", () => {
	it("tests delete item", () => {
        return chai.request(server)
            .delete('/item/1234')
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.text).to.not.be.empty;
            });
	});
});