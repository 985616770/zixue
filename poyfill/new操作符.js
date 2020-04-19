/**
 * new的原理
 * 1. 创造一个空对象
 * 2. 把构造函数的prototype,作为空对象的原型
 * 3. this赋值给这个空对象(apply),执行构造函数的代码（为这个新对象添加属性）
 * 4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
 * @param {Function} fn 构造函数
 * @param {any} args 参数
 */
function newDo() {
  const constructor = [].shift.call(arguments)
  let _this = Object.create(constructor.prototype)
  let res = constructor.apply(_this, arguments)
  return res ? res : _this
}
// 另一种实现
function objectFactory() {
  let newObject = null,
    constructor = Array.prototype.shift.call(arguments),
    result = null

  // 参数判断
  if (typeof constructor !== 'function') {
    console.error('type error')
    return
  }

  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype)

  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments)

  // 判断返回对象
  let flag = result && (typeof result === 'object' || typeof result === 'function')

  // 判断返回结果
  return flag ? result : newObject
}

function A(name) {
  this.name = name
}
A.prototype.a = function () {
  console.log(this.name)
}
const b = objectFactory(A, 'ss')
let c = newDo(A, 'cc')
console.dir(b)
console.dir(c)
/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
function newOperator(ctor) {
  if (typeof ctor !== 'function') {
    throw 'newOperator function the first param must be a function'
  }
  // ES6 new.target 是指向构造函数
  newOperator.target = ctor
  // 1.创建一个全新的对象，
  // 2.并且执行[[Prototype]]链接
  // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
  var newObj = Object.create(ctor.prototype)
  // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
  // 除去ctor构造函数的其余参数
  var argsArr = [].slice.call(arguments, 1)
  // 3.生成的新对象会绑定到函数调用的`this`。
  // 获取到ctor函数返回结果
  var ctorReturnResult = ctor.apply(newObj, argsArr)
  // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
  var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null
  var isFunction = typeof ctorReturnResult === 'function'
  if (isObject || isFunction) {
    return ctorReturnResult
  }
  // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
  return newObj
}


