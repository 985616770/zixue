

const arr = [1, 2, 3, { a: 1 }]
// 当object只有一层的时候为深拷贝

// 浅拷贝的实现1

function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== 'object') return

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {}

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key]
    }
  }

  return newObject
}
// 浅拷贝的实现2

const b = { ...obj }
// 浅拷贝的实现3

const c = Object.assign({}, obj)

// 浅拷贝的实现3,4(为数组)

const d = arr.concat()
const e = arr.slice()
arr[3].a = 5
// console.log(b, c, d, e)

