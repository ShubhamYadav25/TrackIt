import puppeteer from "puppeteer";

export async function getProductPrice(url: string): Promise<number | null> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    try {
        // Flipkart price selector
        await page.goto(url, { waitUntil: "networkidle2" }); // Load Flipkart page

        // Extract price using class name
        const priceText = await page.$eval(".Nx9bqj.CxhGGd", (el) => el.textContent?.trim() || null);

        if (priceText) {
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
            return price;
        }
    } catch (error) {
        console.error("Error extracting price:", error);
    } finally {
        await browser.close();
    }

    return null;
}
