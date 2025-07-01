// imports
import express from "express";
import router from "../routes/vendors.js";

import path from "path";
import { fileURLToPath } from "url";

//module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// catch-all for SPA routing
app.get("/{*any}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

// server
const PORT = process.env.PORT || 8080;
app.listen(
    PORT,
    console.log(
        `\nExpress.js server ready: ${BLUE_TEXT}http://localhost:${PORT}/${DEFAULT_TEXT}\n`
    )
);
