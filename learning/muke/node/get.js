let http = require('http');
let url = require('url');

http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url);
    console.log(pathname);
    console.log(query);
  })
  .listen(3002);
