# async-http-process
Microservice M1 and Microservice M2 are Node.js applications that publishes and consumes messages from a RabbitMQ queue, processes them, and publishes the results back to the queue after a delay.
## Features
- Consumes tasks from RabbitMQ.
- Processes tasks with a simulated delay (5 seconds).
- Publishes results back to RabbitMQ.
  
Installation and Setup
# Getting Started
## Prerequisites
* Node.js installed
* RabbitMQ server running
* Dockerfile

## Installation
1. Clone the repository:
git clone https://github.com/VENOMM9/async-http-process.git
2. Install dependencies:
  - cd async-http-process
   - npm install
   
## Logs
Check the logs for each microservice for detailed information about their activities:
- Microservice M1: microservice-m1.log
- Microservice M2: microservice-m2.log


## Configuration
Ensure that you have a .env file in the project root with the following configurations:
1. RABBITMQ_HOST=your-rabbitmq-host
2. RABBITMQ_PORT=your-rabbitmq-port
3. RABBITMQ_USERNAME=your-rabbitmq-username
4. RABBITMQ_PASSWORD=your-rabbitmq-password

## Usage
Start the Microservice in M1
- npm start

## License
This project is licensed under the MIT License 

