const http = require('http');
const fs = require('fs');

const server = http.createServer();
const wwwDir = 'F:/study/zixue/heima/nodeJS/02';

server.on('request', function(req, res) {
  const url = req.url;
  fs.readFile('./template.html', function(err, data) {
    if (err) {
      return res.end('404 not found 1');
    }

    fs.readdir(wwwDir, function(err, files) {
      if (err) {
        return res.end('Can not found dir');
      }
      console.log(files);
      let content = '';
      files.forEach(item => {
        content += `
        <tr>
            <td data-value="apple/"><a class="icon dir" href="F:/study/zixue/heima/nodeJS/02">${item}/</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
          </tr>
        `;
      });

      data = data.toString();
      data = data.replace('^_^', content);

      res.end(data);
    });
  });
});

server.listen(3000, function() {
  console.log('is running');
});
