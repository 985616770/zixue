const express = require('express');
const server = express();

server.listen(2222);
server.use(express.static('./'));
