var myObject = {
  a: 2,
  b: 3
};

Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next: function() {
        return {
          value: o[ks[idx++]],
          done: idx > ks.length
        };
      }
    };
  }
});

var randoms = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return { value: Math.random().toFixed(2) *100 };
      }
    };
  }
};

var randoms_pool = [];

for (const n of randoms) {
  randoms_pool.push(n);
  if (randoms_pool.length === 100) {
    break;
  }
}
console.log(randoms_pool);