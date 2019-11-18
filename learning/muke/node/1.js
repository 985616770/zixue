// let
let e = process.env;

// if (e.dev) {
//   console.log('object')
// } else {
//   console.log('sss')
// }

// console.log(__dirname)

let [, , a, b] = [...process.argv];

let c = parseInt(a) + parseInt(b);

console.log(c);
