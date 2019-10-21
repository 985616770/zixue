//  load module (have core module )
const fs = require('fs');

// read docs
// two paramter (path, callback(function))
//  callback
// success:
// data => data
// error => null
// failed:
// data => undefined
// error => mistake object

fs.readFile('data/string.txt', function(error, data) {
  if (error) {
    console.log('读取失败');
  } else {
    console.log(data.toString());
  }
});
