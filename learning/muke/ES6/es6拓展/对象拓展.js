let obj1 = {
    a: 2
};

let name = 'asdfasdfsdafsd';
let obj2 = {
    a: 3,
    [+name]: 2
};
let obj3 = { ...obj1, ...obj2 };
// let obj3 = Object.assign({}, obj1, obj2);
// console.log(obj3);

console.log(Object.entries(obj2));
console.log(Object.keys(obj2));
console.log(Object.values(obj2));

// for (const k of Object.keys(obj2)) {
//     console.log(k);
// }


console.log(Object.is(+0, -0));
console.log(Object.is(NaN, NaN));
