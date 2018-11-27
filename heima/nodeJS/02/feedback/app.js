const http = require('http');
const fs = require('fs');
const template = require('art-template');

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
    const url = req.url;
    if (url === '/') {
      fs.readFile('./views/index.html', function(err, data) {
        if (err) {
          return res.end('404 Not Found.');
        }
        const htmlStr = template.render(data.toString(), {
          comments: comments
        });
        res.end(htmlStr);
      });
    } else if (url.indexOf('/public/') === 0) {
      fs.readFile('.' + url, function(err, data) {
        if (err) {
          return res.end('404 Not Found');
        }
        res.end(data);
      });
    } else if (url === '/post') {
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
