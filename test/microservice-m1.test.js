const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { app, publishToQueue } = require('../src/microservice_m1'); // Adjust the path

chai.use(chaiHttp);

describe('Microservice M1', () => {
  try {
    it('should publish a message to the queue on /process', async () => {
      // Stub the publishToQueue function
      const publishStub = sinon.stub(app, 'publishToQueue').resolves();

      const response = await chai
        .request(app)
        .post('/process')
        .send({ requestData: {} });

      expect(response).to.have.status(200);
      expect(publishStub.calledOnce).to.be.true;

      // Restore the original function after the test
      publishStub.restore();
    });
  } catch (error) {
    console.error('Error in Microservice M1 test:', error.message);
  }
});
