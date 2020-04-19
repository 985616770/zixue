// 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
function curry(fn, ...args) {
  // 获取函数需要的参数长度
  let length = fn.length

  args = args || []

  if (args.length === length) {
    return fn(...args)
  }

  return function () {
    let subArgs = args.slice()

    // 拼接得到现有的所有参数
    if (arguments.length > 0) {
      for (let i = 0; i < arguments.length; i++) {
        subArgs.push(arguments[i])
      }
    }

    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= length) {
      // 如果满足，执行函数

      return fn.apply(this, subArgs)
    } else {
      // 如果不满足，递归返回科里化的函数，等待参数的传入

      return curry.call(this, fn, ...subArgs)
    }
  }
}

// es6 实现
function curry2(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}
function add(a, b, c) {
  return a + b + c
}

console.log(0.1 + 0.2 - 0.3 < Number.EPSILON)
