console.log('start');

new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('step1');
    resolve('100');
  }, 1000);
})
  .then(value => {
    return new Promise((resolve, reject) => {
      console.log('step1-1');
      setTimeout(() => {
        resolve('110');
      }, 1000);
    });
  })
  .then(value => {
    console.log('step1-1');
    return value;
  })
  .then(value => {
    console.log('step1-2');
    return value;
  })
  .then(value => {
    console.log('step1-3');
    console.log(value);
  });
