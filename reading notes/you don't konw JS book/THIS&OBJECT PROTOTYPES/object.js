var myObject = {
  a:2
}

Object.defineProperty(myObject,"a",{
  value:4,
  writable: true,
  configurable: false, // 单向操作
  enumerable: true
})