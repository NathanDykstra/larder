import { server } from '../../index';
import * as HttpStatus from 'http-status-codes';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe("get homepage", () => {
	it("tests the base route", () => {
		return chai.request(server)
			.get('/')
			.then(res => {
				chai.expect(res.status).to.equal(HttpStatus.OK);
				chai.expect(res).to.be.html;
				chai.expect(res.text).to.not.be.empty;
			});
	});
});

describe("get bad url", () => {
	it("tests redirect to base url", () => {
		return chai.request(server)
			.get('/this_is_garbage')
			.then(res => {
				chai.expect(res).redirectTo(/^.+?[^\/:](?=[?\/]|$)/);
			});
	});
});