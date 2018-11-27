const http = require('http');
const fs = require('fs');

fs.readdir('F:/study/zixue/heima/nodeJS/02', function(err, files) {
  if (err) {
    return console.log('目录不存在');
  }else {
    console.log(files);
  }
});
