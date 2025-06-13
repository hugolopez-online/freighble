// imports

import express from "express";
import router from "../routes/vendors.js";

const app = express();

// middleware
app.use(express.static("dist"));
app.use("/api/vendors", router);

// server
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server ready and listening in port ${PORT}`));
