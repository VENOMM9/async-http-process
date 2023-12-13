const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../src/microservice_m1');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Microservice M1', () => {
  it('should publish a message to the queue on /process', async () => {
    const response = await chai
      .request(app)
      .post('/process')
      .send({ requestData: {} });

    // Basic assertions
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal({ status: 'Request received and processing initiated' });
  });
});
