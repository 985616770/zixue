let obj1 = {
    a: 1
};
let obj2 = {
    b: 1
};

let obj = Object.create(obj1);
console.log( obj);

Object.setPrototypeOf(obj, obj2);
console.log( obj);
