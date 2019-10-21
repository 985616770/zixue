var myObject = {
  a: 2
};

Object.defineProperty(myObject, 'a', {
  value: 4,
  writable: true,
  configurable: false, // 单向操作
  enumerable: true
});

var m2Object = {
  b: 2
};
Object.preventExtensions(m2Object);
m2Object.a = 3;
console.log(m2Object.a);

var m3Object = {
  get a() {
    return this._a_;
  },
  set a(val) {
    this._a_ = val * 2;
  }
};
m3Object.a = 3;
console.log(m3Object.a);


const Object3 = { }

Object.defineProperty(Object3, "b", {
  enumerable: false,
  value: 2
})

Object.defineProperty(Object3, "a", {
  enumerable: true,
  value: 3
})

console.log(Object3.a,  Object3.b);

for (let k in Object3) {
  console.log(k,Object3[k]);
}

const myArray = [1, 2, 3]
for (let v of myArray) {
  console.log(v);
}

var it = myArray[Symbol.iterator]();

console.log(it.next());
console.log(it.next());
console.log(it.next());