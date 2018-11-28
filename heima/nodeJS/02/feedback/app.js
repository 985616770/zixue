const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');

const comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
];

http
  .createServer(function(req, res) {
    const parseObj = url.parse(req.url, true);
    const pathname = parseObj.pathname;
    if (pathname === '/') {
      fs.readFile('./views/index.html', function(err, data) {
        if (err) {
          return res.end('404 Not Found.');
        }
        const htmlStr = template.render(data.toString(), {
          comments: comments
        });
        res.end(htmlStr);
      });
    } else if (pathname.indexOf('/public/') === 0) {
      fs.readFile('.' + pathname, function(err, data) {
        if (err) {
          return res.end('404 Not Found');
        }
        res.end(data);
      });
    } else if (pathname === '/pinglun') {
      const comment = parseObj.query;
      comment.dateTime = '2017-12-1 17212';
      comments.unshift(comment);

      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', function(err, data) {
        if (err) {
          return res.end('404 Not Found.');
        }
        res.end(data);
      });
    } else {
      fs.readFile('./views/404.html', function(err, data) {
        if (err) {
          return res.end('404 Not Found');
        }
        res.end(data);
      });
    }
  })
  .listen(3000, function() {
    console.log('running');
  });
