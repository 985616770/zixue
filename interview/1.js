console.log('start')
const a = new Promise(resolve => {
  console.log('p1')
}).then(() => {
  console.log('p2')
})

const b = async function () {
  await a
  console.log('a1')
  await b
  console.log('a2')
}
const v =  b()
console.log('end');
