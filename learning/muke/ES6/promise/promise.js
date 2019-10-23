console.log('ceshi');

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello');
  }, 1000);
})
  .then(function(value) {
    console.log('hello');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('world');
      }, 2000);
    });
  })
  .then(function(value) {
    console.log(`${value}:world`);
  });
