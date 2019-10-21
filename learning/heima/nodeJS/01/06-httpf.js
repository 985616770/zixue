const http = require('http');

const server = http.createServer();
server.on('request', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('hello 世界')
})

server.listen(3000, function () {
  console.log('Server is running');
})