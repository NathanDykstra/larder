import { server } from '../../index';
import * as HttpStatus from 'http-status-codes';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe("add item type", () => {
	it("tests add item type", () => {
        return chai.request(server)
            .post('/itemType')
            .send({
                Id: 1,
                Name: "Test Name",
                Description: "Test Description"
            })
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.have.property('Id').equal(1);
            });
	});
});

describe("get item type", () => {
	it("tests get item type", () => {
        return chai.request(server)
            .get('/itemType/1')
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.have.property('Name').equal("Test Name");
                chai.expect(res.body).to.have.property('Id').equal(1);
                chai.expect(res.body).to.have.property('Description').equal("Test Description");
            });
	});
});

describe("update item type", () => {
	it("tests update item type", () => {
        return chai.request(server)
            .put('/itemType')
            .send({
                Id: 1,
                Name: "Test Name Update",
                Description: "Test Description"
            })
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.text).to.not.be.empty;
            });
	});
});

describe("delete item type", () => {
	it("tests delete item type", () => {
        return chai.request(server)
            .delete('/itemType/1')
            .then(res => {
                chai.expect(res.status).to.equal(HttpStatus.OK);
                chai.expect(res).to.be.json;
                chai.expect(res.text).to.not.be.empty;
            });
	});
});