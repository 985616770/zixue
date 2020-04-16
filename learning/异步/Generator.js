function* Hello() {
  yield 100
  yield function () {
    return 200
  }
  yield 300
}

const h = Hello()
// console.log(typeof h)
// console.log(h.next())
// console.log(h.next())
// console.log(h.next())

// console.log(Array.prototype.slice)
// console.log(Array.prototype[Symbol.iterator])

const arr = [100, 200, 300]
const iterator = arr[Symbol.iterator]()
// console.log(iterator)
// for (const i of iterator) {
//   console.log(i);

// }

function* G() {
  const a = yield 100
  console.log('a', a) // a aaa
  const b = yield 200
  console.log('b', b) // b bbb
  const c = yield 300
  console.log('c', c) // c ccc
}
const g = G()
// g.next()    // value: 100, done: false
// g.next('aaa') // value: 200, done: false
// g.next('bbb') // value: 300, done: false
// g.next('ccc') // value: undefined, done: true

function* fibonacci() {
  let [prev, curr] = [0, 1]
  for (;;) {
    ;[prev, curr] = [curr, prev + curr]
    // 将中间值通过 yield 返回，并且保留函数执行的状态，因此可以非常简单的实现 fibonacci
    yield curr
  }
}
for (let n of fibonacci()) {
  if (n > 1000) {
    break
  }
  console.log(n)
}

/**
 * thunk 函数
 * @param {String} fileName 
 * @param {String} codeType 
 */
const thunk = function (fileName, codeType) {
  // 返回一个只接受 callback 参数的函数
  return function (callback) {
      fs.readFile(fileName, codeType, callback)
  }
}
const readFileThunk = thunk('data1.json', 'utf-8')
readFileThunk((err, data) => {
  // 获取文件内容
})

