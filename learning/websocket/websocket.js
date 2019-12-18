const app = require('express')();
const server = require('http').Server(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8004 });

wss.on('connection', function connection(ws) {
  console.log('server: receive connection');
  ws.on('message', function coming(message) {
    console.log('server: received :', message);
  });
  ws.send('world');
});

app.get('/', (req, res) => {
  res.sendfile(__dirname + './index.html');
});

app.listen(3000);
