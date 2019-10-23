console.log('ceshi_3');

new Promise(resolve => {
  console.log('load');
  resolve('hello');
})
  .then(value => {
    (function() {
      'use strict';
      setTimeout(() => {
        return new Promise((resolve, reject) => {
          console.log('ww');
          resolve('oo');
        });
      }, 2000);
    })();
    console.log(value);
    return false;
  })
  .then(value => {
    console.log(value+'222');
  });
