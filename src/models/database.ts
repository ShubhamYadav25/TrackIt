import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Initialize database
export async function initializeDB(): Promise<Database> {
    const db = await open({
        filename: "./prices.db",
        driver: sqlite3.Database,
    });

    // Create table if not exists
    await db.exec(`
        CREATE TABLE IF NOT EXISTS prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            link TEXT NOT NULL,
            price TEXT NOT NULL,
            time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    
    return db;
}

// Insert price data
export async function savePrice(db: Database, link: string, price: string) {
    await db.run(`INSERT INTO prices (link, price) VALUES (?, ?)`, [link, price]);
}

// Get all prices
export async function getAllPrices(db: Database) {
    return await db.all(`SELECT * FROM prices ORDER BY time DESC`);
}
