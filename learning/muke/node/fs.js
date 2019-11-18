let fs = require('fs');

// fs.readFile(`${__dirname}/123.txt`, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data.toString());
//   }
// });

fs.writeFile('./123.text', 'pppp', (err, data) => {
  if (err) throw err;
});
