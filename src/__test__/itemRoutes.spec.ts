import { server } from '../index';
import * as HttpStatus from 'http-status-codes';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe("get item", () => {
	it("tests get item", () => {
        chai.request(server)
            .get('/item/088354548300')
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.text).to.not.be.empty;
            });
	});
});

describe("add item", () => {
	it("tests add item", () => {
        chai.request(server)
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
                chai.expect(res.text).to.not.be.empty;
            });
	});
});

describe("update item", () => {
	it("tests update item", () => {
        chai.request(server)
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
        chai.request(server)
            .delete('/item/1234')
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.text).to.not.be.empty;
            });
	});
});