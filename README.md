# 🚀 TrackIt - Price Tracking Made Easy!

## 🔍 Overview

TrackIt is a smart system that **monitors product prices** across different platforms for now flipkart. Users can **subscribe to products** and receive **real-time notifications** 📢 when prices drop. Built using **TypeScript, Node.js, and Kafka**, TrackIt ensures **scalability, efficiency, and timely updates** ⏳.

## ✨ Features

- 🛒 **Product Subscription**: Easily add products to track their prices.
- 📩 **Instant Notifications**: Get alerts via **Telegram** when prices change.
- 🤖 **Automated Price Tracking**: The system scrapes product prices **every hour**.
- 🗄 **Database Storage**: Uses **SQLite** to store product info and price history.

## 🛠 Tech Stack

- 💻 **Frontend**: HTML,CSS, JavaScript
- ⚙️ **Backend**: Node.js, Express.js, SQLite
- 🕵️‍♂️ **Scraper**: Puppeteer
- 🕵️‍♂️ **Tracking Job**: Node-cron
- 🔗 **Messaging**: Kafka
- 🤖 **Notifications**: Telegram Bot API

## 🏗 Installation & Setup

### ✅ Prerequisites

- Node.js (v16+ recommended)
- Kafka
- SQLite

### 📌 Steps to Set Up

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/trackit.git
   cd trackit
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run kafka
   ```bash
     docker-compose up -d
   ```
4. Start the backend server:
   ```bash
   npm run server
   ```
5. Start the tracker job:
   ```bash
   npm run tracker
   ```
6. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

## 🚀 Usage

- Open `http://localhost:3000` 🌍 to access the UI.
- Add a product by entering its **Flipkart** URL 🔗.
- The **tracker job** will check for price changes hourly.
- Receive **real-time alerts** in your Telegram channel 📲.

## 🤝 Contributing

Want to make TrackIt even better? Feel free to submit **issues** and **pull requests** 🚀.

## 📜 License

This project is licensed under the **me** 📝.

Happy tracking! 🎯

