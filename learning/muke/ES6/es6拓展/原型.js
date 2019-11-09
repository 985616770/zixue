let obj2 = {
    a: 1
};
let obj1 = {
    b: 1,
    get() {
        console.log(super.a);
    }
};

// let obj = Object.create(obj1);
// console.log(obj1);

Object.setPrototypeOf(obj1, obj2);
console.log(obj1);
console.log(Object.getPrototypeOf(obj1));
obj1.get()