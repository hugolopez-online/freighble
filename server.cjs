const http = require("http");
// TODO: replace module import with a fs readFile approach, so it reads from a .json file
const vendors = require("./vendors_module.cjs");

const server = http.createServer((req, res) => {
    if (req.url === "/api") {
        console.log(`Server hit at "${req.url}"`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(vendors));
    }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    return console.log(`Server ready and listening on port ${PORT}`);
});
