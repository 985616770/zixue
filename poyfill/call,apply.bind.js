// call函数实现
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    return undefined // 用于防止 Function.prototype.myCall() 直接调用
  }
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window
  // 获取参数
  const args = [...arguments].slice(1)

  // 设置symbol,独一无二
  const fn = Symbol()

  // 将调用函数设为对象的方法
  context[fn] = this

  // 调用函数
  const result = context[fn](...args)

  // 将属性删除
  delete context[fn]

  return result
}

// apply 函数实现

Function.prototype.myApply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }

  // 判断 context 是否存在，如果未传入则为 window
  context = context || window

  // 设置symbol,独一无二
  const fn = Symbol()

  // 将调用函数设为对象的方法
  context[fn] = this

  // 调用方法
  if (arguments[1]) {
    result = context[fn](...arguments[1])
  } else {
    result = context[fn]()
  }

  // 将属性删除
  delete context[fn]

  return result
}

// bind 函数实现
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  // 获取参数
  const  args = [...arguments].slice(1),
    fn = this;

  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};