Promise.resolve().then(()=>{
  console.log('step1');
  return Promise.resolve('hello')
}).then((v) =>{
  console.log(v+'sdad');
  return Promise.resolve(new Promise((resolve) => {
    setTimeout(() => {
      resolve('good')
    }, 2000);
  }))
}).then((v)=>{
  console.log(v+' evening');
  return Promise.resolve({
    then(){
      console.log('ssss');
    }
  })
})