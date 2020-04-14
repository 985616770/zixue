const app = require('express')()
const server = require('http').Server(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', function (ws) {
  console.log('server : receive connection')
  ws.on('message', function (message) {
    console.log('server: recevied: %s', message)
  })
  ws.send('world')
})

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})

app.listen(3000)
