// imports

import express from "express";
import router from "../routes/vendors.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.listen(PORT, console.log(`Server ready and listening to port ${PORT}`));
