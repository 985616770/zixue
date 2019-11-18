const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');
let user = {
  admin: '123',
};

http
  .createServer((req, res) => {
    let path, get, post;

    if (req.method === 'GET') {
      let { pathname, query } = url.parse(req.url, true);
      path = pathname;
      get = query;
      complete();
    } else if (req.method === 'POST') {
      let result = [];
      path = req.url;
      req.on('data', buffer => {
        result.push(buffer);
      });
      // 异步
      req.on('end', () => {
        post = qs.parse(Buffer.concat(result).toString());
        complete();
        console.log(user);
      });
    }
    function complete() {
      if (path === '/login') {
        res.writeHead(200, {
          'Content-type': 'text/plain;charset=utf-8',
        });
        let { username, password } = get;

        if (!user[username]) {
          res.end(
            JSON.stringify({
              err: 1,
              msg: 'user not 存在',
            }),
          );
        } else if (user[username] !== password) {
          res.end(
            JSON.stringify({
              err: 1,
              msg: 'password is wrong',
            }),
          );
        } else {
          res.end(
            JSON.stringify({
              err: 0,
              msg: 'success',
            }),
          );
        }
      } else if (path === '/reg') {
        res.writeHead(200, {
          'Content-type': 'text/plain;charset=utf-8',
        });
        let { username, password } = post;
        if (user[username]) {
          res.end(
            JSON.stringify({
              err: 1,
              msg: 'user 存在',
            }),
          );
        } else {
          user[username] = password;
          res.end(
            JSON.stringify({
              err: 0,
              msg: 'success register',
            }),
          );
        }
      } else {
        fs.readFile(`${__dirname}/www${path}`, (err, data) => {
          if (err) {
            res.end(`404`);
            return;
          }
          res.end(data);
        });
      }
    }
  })
  .listen(3002);
