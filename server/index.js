// imports
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../db/index.js";
import router from "../routes/vendors.js";

// module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// console formatting
const RED_TEXT = "\u001b[31m";
const BLUE_TEXT = "\u001b[36m";
const GREEN_TEXT = "\u001b[32m";
const YELLOW_TEXT = "\u001b[33m";
const DEFAULT_TEXT = "\u001b[37m";

// app
const app = express();

// middleware
app.use(express.static("dist"));
app.use("/api/vendors", router);

// catch-all for client-side routing
app.get("/{*any}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

// server
const PORT = process.env.PORT || 8080;

try {
    await connectDB();
    console.log(
        `\n${GREEN_TEXT}Connected to MongoDB database...${DEFAULT_TEXT}`
    );
    app.listen(
        PORT,
        console.log(
            `Express.js server ready: ${BLUE_TEXT}http://localhost:${PORT}/${DEFAULT_TEXT}\n`
        )
    );
} catch (err) {
    console.error(err);
}
