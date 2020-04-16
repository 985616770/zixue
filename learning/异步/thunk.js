const fs = require('fs')
// thunk 库
const thunkify = require('thunkify')
// 自驱动流程 库
const co = require('co')
// promise 库
const Q = require('q');

const readFileThunk = thunkify(fs.readFile)
const readFilePromise = Q.denodeify(fs.readFile)

const gen1 = function* () {
  const r1 = yield readFileThunk('./data/data1.json')
  console.log(JSON.parse(r1))
  const r2 = yield readFileThunk('./data/data2.json')
  console.log(r2)
}
const gen2 = function* () {
  const r1 = yield readFilePromise('./data/data1.json')
  console.log(JSON.parse(r1))
  const r2 = yield readFilePromise('./data/data2.json')
  console.log(r2)
}



// const g = gen()

// 试着打印 g.next() 这里一定要明白 value 是一个 thunk函数 ，否则下面的代码你都看不懂

// g.next() 返回 {{ value: thunk函数, done: false }}
// console.log(g.next())

// 下一行中，g.next().value 是一个 thunk 函数，它需要一个 callback 函数作为参数传递进去
// g.next().value((err, data1) => {
//   // 这里的 data1 获取的就是第一个文件的内容。下一行中，g.next(data1) 可以将数据传递给上面的 r1 变量，此前已经讲过这种参数传递的形式

//   // 下一行中，g.next(data1).value 又是一个 thunk 函数，它又需要一个 callback 函数作为参数传递进去

//   g.next(data1).value((err, data2) => {
//     // 这里的 data2 获取的是第二个文件的内容，通过 g.next(data2) 将数据传递个上面的 r2 变量

//     g.next(data2)
//   })
// })

/**
 *自驱动流程  原理
 */

function run(generator) {
  const g = generator()
  function start(err, data) {
    const result = g.next(data) // 返回 { value: thunk函数, done: ... }
    if (result.done) {
      // result.done 表示是否结束，如果结束了那就 return 作罢
      return
    }
    result.value(start) // result.value 是一个 thunk 函数，需要一个 callback 函数作为参数，而 next 就是一个 callback 形式的函数
  }
  // 手动执行以启动第一次 next
  start()
}

// 启动执行

// run(gen)

co(gen1).then(() => {
  console.log('done')
})

co(gen2).then(() => {
  console.log('done')
})