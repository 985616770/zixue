let path = require('path');

console.log(path.dirname('./node/a/b/v/1.jpg'));
console.log(path.basename('./node/a/b/v/1.jpg'));
console.log(path.extname('./node/a/b/v/1.jpg'));

console.log(path.resolve(__dirname, 'path.js'));


