let http = require('http');
let qs = require('querystring');
http
  .createServer((req, res) => {
    let result = [];
    req.on('data', buffer => result.push(buffer));
    req.on('end', () => {
      let data = Buffer.concat(result).toString();

      console.log(qs.parse(data));
      // {...:...,
      // ...:...}
    });
  })
  .listen(3002);
