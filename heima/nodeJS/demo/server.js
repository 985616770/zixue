const http = require('http');

http.createServer(function (req, res) {
  console.log("Server");
  res.writeHead(200, {"Content-Type":"text/plain"});
  res.write("hello World");
  res.end();
}).listen(3000);

console.log("Server has started.");