// microservice-m2.js
const amqp = require('amqplib');
const dotenv = require('dotenv');
const winston = require('winston');
const { publishToQueue } = require('./microservice_m1');

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'microservice-m2.log' }),
  ],
});

const consumeFromQueue = async (queueName, callback) => {
  try {
    const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    
    channel.consume(queueName, (message) => {
      try {
        if (!message) {
          return;
        }

        const data = JSON.parse(message.content.toString());
        callback(data);
        channel.ack(message);

        logger.info('Processing task:', { data });

        setTimeout(() => {
          const result = data.parameter * 2;
          logger.info('Task processed successfully. Result:', { result });

          
          publishToQueue('tasks', { result });
        }, 5000);
      } catch (error) {
        console.error('Error processing task:', error.message);
      }
    });
  } catch (error) {
    console.error('Error consuming from the queue:', error.message);
  }
};

consumeFromQueue('tasks', (data) => {
  console.log('Received data from tasks queue:', data);

});
