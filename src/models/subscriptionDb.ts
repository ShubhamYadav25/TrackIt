import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Initialize database
export async function initializSubscriptioneDB(): Promise<Database> {
    const db = await open({
        filename: "./subscription.db",
        driver: sqlite3.Database,
    });

    // Create table if not exists
    await db.exec(`
       CREATE TABLE IF NOT EXISTS subscriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_link INTEGER NOT NULL,
            phone_number TEXT NOT NULL
        );
    `);
    
    return db;
}

export async function saveAlertInfo(productName: string, productLink: string, phoneNumber: string) {
    const db = await initializSubscriptioneDB(); 

    await db.run(
        "INSERT INTO subscriptions (user_id, product_link, phone_number) VALUES (?, ?, ?)",
        [productName, productLink, phoneNumber]
    );

    db.close();
}

export async function getAllAlertInfo() {
    const db = await initializSubscriptioneDB(); 

    var alerts =  await db.all(`SELECT * FROM subscriptions`);

    db.close();

    return alerts;
}
