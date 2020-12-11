import { server } from '../index';
import * as HttpStatus from 'http-status-codes';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe("add brand", () => {
	it("tests add brand", () => {
        return chai.request(server)
            .post('/brand')
            .send({
                Name: "Brother"
            })
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.have.property('Id').equal(1);
            });
	});
});

describe("get brand", () => {
	it("tests get brand", () => {
        return chai.request(server)
            .get('/brand/1')
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.have.property('Name').equal("Brother");
                chai.expect(res.body).to.have.property('Id').equal(1);
            });
	});
});

describe("update brand", () => {
	it("tests update brand", () => {
        return chai.request(server)
            .put('/brand')
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

describe("delete brand", () => {
	it("tests delete brand", () => {
        return chai.request(server)
            .delete('/brand/1234')
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.text).to.not.be.empty;
            });
	});
});