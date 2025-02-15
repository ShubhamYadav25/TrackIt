const cron = require('node-cron');
const puppeteer = require('puppeteer');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// Function to initialize database
async function getDb() {
    return open({
        filename: '../../prices.db',
        driver: sqlite3.Database
    });
}

// Function to scrape price from Flipkart
async function scrapePrice(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Extract price using the Flipkart class selector
        const priceText = await page.$eval('.Nx9bqj.CxhGGd', (el) => el.textContent.trim());

        if (priceText) {
            const price = parseFloat(priceText.replace(/[^0-9.]/g, '')); // Convert ₹599 to 599
            await browser.close();
            return price;
        }
    } catch (error) {
        console.error(`Error scraping ${url}:`, error);
    }

    await browser.close();
    return null;
}

/**
 * Job will pick all the links stored in DB
 * For each link, it check the price 
 * if price is less than old value it will send the price to kafka topic 
 */
async function checkAndUpdatePrices() {
    const db = await getDb();
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Get all products added today
    const products = await db.all(`SELECT * FROM prices`);
    // SELECT * FROM prices WHERE time LIKE ?`, [`${today}%`])

    // links in db
    console.log(products);

    for (const product of products) {
        const { id, link, price: oldPrice } = product;
        console.log(`Checking price for ${link}...`);

        const newPrice = await scrapePrice(link);

        if (newPrice !== null && newPrice < oldPrice) {
            console.log(`Price drop detected! Updating from ₹${oldPrice} to ₹${newPrice}`);
            await db.run(`UPDATE prices SET price = ? WHERE id = ?`, [newPrice, id]);
        }
    }

    await db.close();
}

// Schedule the cron job to run every hour
// every min * * * * *
// every hour 0 * * * *
cron.schedule('* * * * *', async () => {
    console.log('Running price check job...');
    await checkAndUpdatePrices();
    console.log('Price check job completed!');
});

console.log('Cron job scheduled! Running every hour...');