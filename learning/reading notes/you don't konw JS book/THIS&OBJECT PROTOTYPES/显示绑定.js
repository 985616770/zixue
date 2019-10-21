// 创建一个包裹函数,接受参数并返回值

// function foo(something) {
//   console.log(this.a, something);
//   return this.a + something;
// }

// var obj = {
//   a: 2
// };

// var bar = function() {
//   return foo.apply(obj, arguments);
// };

// var b = bar(3);
// console.log(b);

// 使用辅助函数

function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

function bind(fn, obj) {
  return function () {
    return fn.apply(obj, arguments)
  }
}

var obj = {
  a: 2
};

var bar = bind(foo, obj)
var b = bar(3);
console.log(b);