# async-http-process
Microservice M1 and Microservice M2 are Node.js applications that publishes and consumes messages from a RabbitMQ queue, processes them, and publishes the results back to the queue after a delay.

# Getting Started
## Prerequisites
*Node.js installed
*RabbitMQ server running

## Installation
1. Clone the repository:
git clone https://github.com/VENOMM9/async-http-process.git
2. Install dependencies:
   cd microservice-m2
   npm install

## Configuration
Ensure that you have a .env file in the project root with the following configurations:
1. RABBITMQ_HOST=your-rabbitmq-host
2. RABBITMQ_PORT=your-rabbitmq-port
3. RABBITMQ_USERNAME=your-rabbitmq-username
4. RABBITMQ_PASSWORD=your-rabbitmq-password

## Usage
Start the Microservice M2:
npm start

## License
This project is licensed under the MIT License 
