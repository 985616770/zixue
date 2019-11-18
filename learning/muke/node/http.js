let http = require('http');
let fs = require('fs');
http
  .createServer((req, res) => {
    console.log(`${__dirname}\\${req.url}`);
    fs.readFile(`${__dirname}/${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 not found');
      } else {
        res.end(data);
      }
    });
  })
  .listen(3002);
