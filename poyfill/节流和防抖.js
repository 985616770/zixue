/**
 * 防抖 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @param idle   {number}    空闲时间，单位毫秒
 * @return {function}    返回客户调用函数
 */
const debounce = (action, idle) => {
  let last
  return function (...arg) {
    clearTimeout(last)
    last = setTimeout(() => {
      action(arg)
    }, idle)
  }
}

/**
 * 节流 返回函数连续调用时，action 执行频率限定为 次 / delay
 * @param delay  {number}    延迟时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */
const throttle = function (action, delay) {
  let last = 0
  return function (...args) {
    let curr = +new Date()
    if (curr - last > delay) {
      action(args)
      last = curr
    }
  }
}
