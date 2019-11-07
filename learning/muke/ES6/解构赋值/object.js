const obj = { a: 2, b: [{ d: 1 }, { e: 2 }], c: 4 };

let {
    b: [{ d }, e]
} = obj;
console.log('结果为', d);
console.log('结果为', e);
