const fs = require('fs');
//success:
// error => null
//defiled => mistake object
// 
// 
fs.writeFile('./data/string.txt', 'asdf', function(error) {
  if (error) {
    console.log('失败');
  } else {
  console.log('写入成功');
    
  }
});
