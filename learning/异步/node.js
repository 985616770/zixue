const fs = require('fs')
const path = require('path')

const readFilePromise = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        // 注意，这里执行 reject 是传递了参数，后面会有地方接收到这个参数
        reject()
      } else {
        // 注意，这里执行 resolve 时传递了参数，后面会有地方接收到这个参数
        resolve(data.toString())
      }
    })
  })
}
const fullFile2 = path.resolve(__dirname, './data/data2.json')
const fullFile1 = path.resolve(__dirname, './data/data1.json')
const result1 = readFilePromise(fullFile1)
const result2 = readFilePromise(fullFile2)

Promise.all([result1, result2])
  .then(data => {
    // 返回数组
    console.log('all', data)
  })
  .catch(error => {
    // console.error(error.stack)
  })

Promise.race([result1, result2])
  .then(data => {
    // 返回一个值
    console.log('race', data)
  })
  .catch(error => {
    // console.error(error.stack)
  })

// 定义一个 thenable 对象
const thenable = {
  // 所谓 thenable 对象，就是具有 then 属性，而且属性值是如下格式函数的对象
  then: (resolve, reject) => {
    console.log('thenable')
    resolve(200)
  }
}

// thenable 对象可以转换为 Promise 对象
const promise = Promise.resolve(thenable)
promise.then(data => {
  // ...
})
