const http = require('http');
const fs = require('fs');
const template = require('art-template');

const server = http.createServer();

const wwwDir = 'F:/study/zixue/heima/nodeJS/02';

server.on('request', function(req, res) {
  const url = req.url;
  fs.readFile('./template-apache.html', function(err, data) {
    if (err) {
      return res.end('404 Not Found.');
    }

    fs.readdir(wwwDir, function(err, files) {
      if (err) {
        return res.end('Can not find www dir.');
      }

      const htmlStr = template.render(data.toString(), {
        title: '哈哈',
        files: files
      });

      res.end(htmlStr);
    });
  });
});
server.listen(3000, function() {
  console.log('running 在发射了...');
});
