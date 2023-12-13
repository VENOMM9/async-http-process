const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const { consumeFromQueue } = require('../src/microservice_m2'); // Adjust the path
const { publishToQueue } = require('../src/microservice_m1'); // Adjust the path

describe('Microservice M2', () => {
  try {
    it('should process a task from the queue with a delay', async () => {
      // Stub the consumeFromQueue function
      const consumeStub = sinon.stub().yields({ parameter: 5 });

      // Replace consumeFromQueue with the stub
      Object.assign(app, { consumeFromQueue: consumeStub });

      // Use a tool like sinon to advance the clock
      // This is just an example; actual implementation might vary
      const clock = sinon.useFakeTimers();

      // Trigger the consumeFromQueue function
      await consumeFromQueue('tasks', callback); // Provide appropriate arguments

      // Advance the clock to simulate the 5-second delay
      clock.tick(5000);

      // Assert that the necessary processing has occurred

      // Restore the original functions after the test
      consumeStub.restore();
      clock.restore();
    });
  } catch (error) {
    console.error('Error in Microservice M2 test:', error.message);
  }
});
