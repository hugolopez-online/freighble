const express = require("express");
const app = express();

// router
const router = require("./routes/vendors.cjs");

// middleware
app.use(express.static("dist"));
app.use("/api/vendors", router);

// server
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server ready and listening in port ${PORT}`));
