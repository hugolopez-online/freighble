// const http = require("http");
// // TODO: replace module import with a fs readFile approach, so it reads from a .json file
// const vendors = require("./vendors_module.cjs");

// const server = http.createServer((req, res) => {
//     console.log(`Server hit at "${req.url}"`);
//     res.writeHead(200, { "Content-Type": "application/json" });
//     return res.end(JSON.stringify(vendors));
// });

// const PORT = process.env.PORT || 8080;

// server.listen(PORT, () => {
//     return console.log(`Server ready and listening on port ${PORT}`);
// });

const express = require("express");
const app = express();

// router
const router = require("./routes/vendors.cjs");

// middleware
app.use("/api/vendors", router);

// server
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server ready and listening in port ${PORT}`));
