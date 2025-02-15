import puppeteer from "puppeteer";
import { savePrice, initializeDB } from "../models/database";

export async function getProductPrice(url: string): Promise<number | null> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const db = await initializeDB(); // Initialize SQLite DB

    try {
        // Flipkart price selector
        await page.goto(url, { waitUntil: "networkidle2" }); // Load Flipkart page

        // Extract price using class name
        const priceText = await page.$eval(".Nx9bqj.CxhGGd", (el) => el.textContent?.trim() || null);

        if (priceText) {
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

            // save in db
            if (price) {
                await savePrice(db, url, price.toString());
                console.log(`Price saved: ${price} for ${url}`);
            } else {
                console.log("Price not found!");
            }

            return price;
        }
    } catch (error) {
        console.error("Error extracting price:", error);
    } finally {
        await browser.close();
        await db.close();
    }

    return null;
}
