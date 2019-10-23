console.log('here we go');
Promise.all([1, 2, 3])
  .then(all => {
    console.log('1', all);
    return Promise.all([
      function() {
        console.log('ooxx ');
      },
      'xxoo',
      false
    ]);
  })
  .then(all => {
    console.log(2, all);
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('im 01');
      }, 1500);
    });
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('im 02');
      }, 1000);
    });
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('im 03');
      }, 900);
    });

    return Promise.all([p1, p2, p3]);
  })
  .then(all => {
    console.log('3', all);
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('im 01');
      }, 1500);
    });
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('im 02');
      }, 1000);
    });
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('im 03');
      }, 900);
    });
    return Promise.all([p1, p2, p3]);
  })
  .then(all => {
    console.log('4', all);
  })
  .catch(err => {
    console.log('出错了'+err);
  });
