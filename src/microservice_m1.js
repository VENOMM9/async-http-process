// microservice-m1.js
const express = require('express');
const amqp = require('amqplib');
const dotenv = require('dotenv');
const winston = require('winston');

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'microservice-m1.log' }),
  ],
});

const app = express();
const port = 4440;

app.use(express.json());

const publishToQueue = async (tasks, data) => {
  try {
    console.log('Attempting to connect to RabbitMQ...');
    const connectionUrl = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
    console.log('Connecting to RabbitMQ:', connectionUrl);
    const connection = await amqp.connect(connectionUrl);


    console.log('Connected to RabbitMQ');
    
    console.log('Creating channel...');
    const channel = await connection.createChannel();
    
    console.log('Asserting queue...');
    await channel.assertQueue(tasks, { durable: true });
    
    console.log('Sending message to the queue...');
    channel.sendToQueue(tasks, Buffer.from(JSON.stringify(data)), { persistent: true });
    
    console.log('Message published successfully');
  } catch (error) {
    console.error('Error publishing to the queue:', error.message);
  }
};

app.post('/process', (req, res) => {
  try {

    console.log('Request body:', req.body);

    const requestData = req.body;
    logger.info('Request received:', { requestData });
console.log(requestData)
    publishToQueue('tasks', requestData);

    res.json({ status: 'Request received and processing initiated' });
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Microservice M1 listening at http://localhost:${port}`);
});

module.exports = {
  publishToQueue,
};
