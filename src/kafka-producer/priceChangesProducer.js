const { Kafka } = require('kafkajs');

// Kafka Configuration
const kafka = new Kafka({
  clientId: 'price-tracker',
  brokers: ['localhost:9092'],
  connectionTimeout: 30000,
});

// Create a producer
const producer = kafka.producer();

const sendPriceUpdate = async (link, newPrice, oldPrice) => {
  await producer.connect();

  const message = {
    link,
    newPrice,
    oldPrice,
    updatedAt: new Date().toISOString(),
  };

  await producer.send({
    topic: 'price-updates',
    messages: [{ value: JSON.stringify(message) }],
  });

  console.log(`Sent price update to Kafka: ${JSON.stringify(message)}`);
};

// Initialize producer on startup
producer.connect().then(() => console.log('Kafka Producer connected')).catch(console.error);

module.exports = { sendPriceUpdate };
