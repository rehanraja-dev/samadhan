const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200; // success
    res.setHeader("Content-Type", "text/plain");

    res.end("Hello World");
});

server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

// command to run or trigger the server is
// node day4.js  from the directory of day4 folder 
