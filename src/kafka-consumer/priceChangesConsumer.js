const { Kafka } = require("kafkajs");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const axios = require("axios");
const {sendTelegramMessage} = require("../messenger/telegramMessenger")

// Initialize Kafka
const kafka = new Kafka({
    clientId: "price-tracker",
    brokers: ["localhost:9092"], 
});

const consumer = kafka.consumer({ groupId: "price-alert-group" });

async function consumeMessages() {
    await consumer.connect();
    await consumer.subscribe({ topic: "price-updates", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const kafkaEventsForPrice = message.value.toString();
            const kafKaMsgProductInfo = JSON.parse(kafkaEventsForPrice); 

            const { link, newPrice, oldPrice } = kafKaMsgProductInfo;
            console.log(`Received product link: ${kafkaEventsForPrice}`);

            const notificationMessage = `Price dropped for: ${link}! Check now. Old price is ${oldPrice} new price is ${newPrice}`;

            // Send Telegram notification
            sendTelegramMessage(notificationMessage);
        },
    });
}

consumeMessages().catch(console.error);
