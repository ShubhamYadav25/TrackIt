const axios = require("axios");

// bot's API toke
const botToken = "----------------------------";


// GroupId
const chatId = "-----------------------------";


// Send message to the Telegram group
async function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: chatId,
            text: message,
        });

        console.log(`Message sent: ${message}`);
        console.log(response.data);
    } catch (error) {
        console.error("Failed to send Telegram message:", error);
    }
}

module.exports = { sendTelegramMessage };