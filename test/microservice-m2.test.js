const consumeFromQueue = require('../src/microservice_m2');
const chai = require('chai');
const expect = chai.expect;

describe('Microservice M2', () => {
  it('should process a task from the queue with a delay', async function () {
    this.timeout(20000); 

    await consumeFromQueue('tasks', (data) => {
      console.log('Received data from tasks queue:', data);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 6000);
      });
    });
  });
});
