/**
 * 1. 创造一个空对象
 * 2. 把构造函数的prototype,作为空对象的原型
 * 3. this赋值给这个空对象(apply)
 * 4. 执行函数
 * 5. 如果没有返回值 则返回this[之前的那个空对象]
 * @param {Function} fn 构造函数
 * @param {any} args 参数
 */
function Constructor(fn, args) {
    var _this = Object.create(fn.prototype);
    var res = fn.apply(_this, args);
    return res ? res : _this;
}
