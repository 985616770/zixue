/**
 * 非尾调用
 */
// Fibonacci 数列
'use strict'

function Fibonacci(n) {
  if (n <= 1) {
    return 1
  }

  return Fibonacci(n - 1) + Fibonacci(n - 2)
}
// 阶乘
function factorial(n) {
  if (n === 1) return 1
  return n * factorial(n - 1)
}

/**
 * 尾递归
 * 1. 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。
 */
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2
  }

  return Fibonacci2(n - 1, ac2, ac1 + ac2)
}

// 优化
function factorial(n) {
  return tailFactorial(n, 1)
}

function tailFactorial(n, total) {
  if (n === 1) return total
  return tailFactorial(n - 1, n * total)
}

/* 柯里化优化 */

// 柯里化（currying），意思是将多参数的函数转换成单参数的形式
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n)
  }
}

function tailFactorial(n, total) {
  if (n === 1) return total
  return tailFactorial(n - 1, n * total)
}

// const factorial = currying(tailFactorial, 1)

factorial(5)

// ES6 的函数默认值
function factorial(n, total = 1) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}

factorial(5) // 120

/* 尾递归优化的实现 */
// 尾递归优化只在严格模式下生效
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f()
  }
  return f
}

function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1)
  } else {
    return x
  }
}
// console.log(trampoline(sum(1, 100000)))

// 尾递归优化
function tco(f) {
  var value
  var active = false
  var accumulated = []

  return function accumulator() {
    accumulated.push(arguments)

    if (!active) {
      active = true
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift())
      }
      active = false
      return value
    }
  }
}

var sum = tco(function (x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  } else {
    return x
  }
})
console.log(sum(4, 2))

// 100001
