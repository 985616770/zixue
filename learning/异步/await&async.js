const Q = require('q')
const fs = require('fs')

const readFilePromise = Q.denodeify(fs.readFile)
// 定义 async 函数
const readFileAsync = async function () {
  const f1 = await readFilePromise('./data/data1.json')
  const f2 = await readFilePromise('./data/data2.json')
  console.log('data1.json', f1.toString())
  console.log('data2.json', f2.toString())

  return 'done' // 先忽略，后面会讲到
}
const result = readFileAsync()