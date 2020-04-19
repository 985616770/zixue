/**
 * 判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
 * @param {Object} left 实例对象
 * @param {Function} right 构造函数
 */
function myInstance(left, right) {
  let __proto__ = Object.getPrototypeOf(left),
    prototype = right.prototype
  while (true) {
    if (!__proto__) return false
    if (__proto__ === prototype) return true
    __proto__ = Object.getPrototypeOf(__proto__)
  }
}
