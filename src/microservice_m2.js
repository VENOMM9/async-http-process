const dotenv = require('dotenv');
const winston = require('winston');
const {  publishToQueue } = require('./microservice_m1');
const amqp = require('amqplib'); 
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
    console.log('Attempting to connect to RabbitMQ...');
    const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
    console.log('Connected to RabbitMQ');

    const channel = await connection.createChannel();
    console.log('Channel created');

    await channel.assertQueue(queueName, { durable: true });
    console.log('Queue asserted');

   

    await channel.consume(queueName, (message) => {
      const data = JSON.parse(message.content.toString());
      callback(data);


      logger.info('Processing task:', { data });
      

      setTimeout(async () => {
        const result =  data.parameter * 2 
        logger.info('Task processed successfully. Result:', { result });

        await publishToQueue('tasks', result);
        

        
      }, 5000);
      
    }, { noAck: false });
  } catch (error) {
    console.error('Error consuming from the queue:', error.message);
  }
};
module.exports = consumeFromQueue;