console.log('123rror');
new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error('错误');
  }, 1000);
})
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error.message);
  });
