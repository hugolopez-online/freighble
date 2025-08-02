/* IMPORTS START */
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../db/index.js";
import usersRouter from "../routes/users.js";
import vendorsRouter from "../routes/vendors.js";
/* IMPORTS END */

/* MODULE START */
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const RED_TEXT = "\u001b[31m";
const BLUE_TEXT = "\u001b[36m";
const GREEN_TEXT = "\u001b[32m";
const YELLOW_TEXT = "\u001b[33m";
const DEFAULT_TEXT = "\u001b[37m";
/* MODULE END */

/* MIDDLEWARE START */
app.use(express.json());
app.use(express.static("dist"));
app.use("/api/users", usersRouter);
app.use("/api/vendors", vendorsRouter);
/* MIDDLEWARE END */

app.get("/{*any}", (req, res) => {
    try {
        return res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

/* SERVER START */
const PORT = process.env.PORT || 8080;

const serve = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
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
};

serve();
/* SERVER END */
