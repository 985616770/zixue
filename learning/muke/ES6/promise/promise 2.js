console.log('ceshi');

let promise = new Promise((resolve, reject) => {
  resolve('hello');
});
setTimeout(() => {
  promise.then(function(value) {
    console.log(`${value}:world`);
  });
}, 1000);
