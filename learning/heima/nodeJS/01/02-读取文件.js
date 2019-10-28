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
function readDir(path, options) {
  return new Promise(resolve => {
    fs.readFile(path, options, (err, files) => {
      if (err) {
        throw err;
      }
      resolve(files);
    });
  });
}

readDir('./data/string.txt')
  .then(value => {
    console.log('成功');
  })
  .catch(err => {
    console.log('失败');
  });
