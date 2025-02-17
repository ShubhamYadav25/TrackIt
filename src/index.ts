import express, { Request, Response } from 'express';
// import cors from 'cors'
import { getProductPrice } from "./scrapers/flipkartScrapper";
import { saveAlertInfo } from './models/subscriptionDb';
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());
// app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "UI")));

// Define the structure of the request body
interface TrackRequestBody {
    url: string;
};

interface CreateAlertBody {
    productName: string;
    productLink:string;
    phoneNumber: string;
};

app.post("/track", async (req: Request<{}, {}, TrackRequestBody>, res: Response) => {
    const { url } = req.body;

    if (!url) {
        // return res.status(400).json({ error: "Flipkart URL is required" });
    }

    const price = await getProductPrice(url);

    if (price !== null) {
        res.json({ message: `Current price: ₹${price}` });
    } else {
        res.status(500).json({ error: "Failed to fetch price" });
    }
    
});

app.post("/create-alert", async (req: Request<{}, {}, CreateAlertBody>, res: Response) => {
    const { productName, productLink, phoneNumber } = req.body;

    if (!productName || !productLink || !phoneNumber) {
        // return res.status(400).json({ error: "All fields are required" });
    }

    try {
        saveAlertInfo(productName, productLink,  phoneNumber);
        res.json({ message: "Alert saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save alert" });
    }
});

// Serve index.html when accessing root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "UI", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
