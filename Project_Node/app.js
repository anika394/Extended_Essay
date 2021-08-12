var http = require('http');
var fs = require('fs');
var url = require('url');

const hostname = "127.0.0.1";
const port = 8081;
// simple code to read file using fs module
const files = fs.readFileSync("index.html");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // give correct input for html
  res.setHeader("Content-Type", "text/html");
  res.end(files);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("Done")
});