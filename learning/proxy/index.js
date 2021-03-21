const s = new Proxy(
  {},
  {
    set(target, propKey, value) {
      console.log(target, propKey, value)

      if (propKey === 'name') {
        throw new TypeError('name属性不允许修改')
      }
      // 不是 name 属性，直接保存
      target[propKey] = value
    }
  }
)

const obj = {
  name: 'app',
  age: '18'
}
const p = new Proxy(obj, {
  get(target, propKey, receiver) {
    console.log('你访问了' + propKey)
    console.log(target, propKey, receiver)

    return Reflect.get(target, propKey, receiver)
  },
  set(target, propKey, value, receiver) {
    console.log('你设置了' + propKey)
    console.log('新的' + propKey + '=' + value)
    console.log(target, propKey, value, receiver)

    Reflect.set(target, propKey, value, receiver)
  }
})
p.age = '20'
console.log(p.age)
p.newPropKey = '新属性'
console.log(p.newPropKey)

const a = 'ads'
