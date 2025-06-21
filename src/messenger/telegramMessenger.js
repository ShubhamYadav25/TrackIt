const axios = require("axios");

// bot's API toke
// const botToken = "----------------------------";
	const botToken = "7855582689:AAF0jYq55pQdMkfVUNYYAueXKW-1aIxx2Qs";


// GroupId
// const chatId = "-----------------------------";
	const chatId = "-1002449524899";


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