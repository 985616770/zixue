var a = NaN;
// console.log(typeof a);
// console.log(parseFloat('1.23df.df'));
var x = 1;
x = x++ + ++x;
// console.log(x);
// console.log(undefined || null || NaN);
// console.log(undefined && null && NaN);

var arr = [1, 23, 4];
// console.log(arr.push(1));
// console.log(arr.unshift(1));
// console.log(arr.reverse());
// console.log(arr.sort());
// console.log(arr.concat([2,2,2]));
// console.log(arr.slice(0,2));
// console.log(arr.splice(0,4,...[1,2,3]));
// console.log(arr.find());
// console.log(arr);

var arr = new Set([1, 1, 1, 2, 2, 2, 3, 3, 3]);
var a = Array.from(arr);
// console.log(
//   a.map(cur => {
//     return cur * 2;
//   })
// );
// console.log(
//   a.find(cur => {
//     return cur == 2;
//   })
// );
// console.log(
//   a.filter(cur => {
//     return cur > 2;
//   })
// );
// console.log(
//   a.some(cur => {
//     return cur < 2;
//   })
// );
// console.log(
//   a.every(cur => {
//     return cur > 0;
//   })
// );
// console.log(
//   a.reduce((acc, cur) => {
//     return acc * cur;
//   }, 1)
// );

var arr2 = [1, 2, 3, [1, 2], [1, [2, [3, 3], 2]]];
// 片平化数组
function flattenDeep(arr1) {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}
var b = flattenDeep(arr2);
// console.log(b.fill(6,-2,-1));
// console.log(b.copyWithin(6,-2,-1));

var str = 'peng';
// console.log(str.charAt(2));
// console.log(str.charCodeAt(2));
// console.log(str.indexOf('n'));
console.log(str.lastIndexOf('n'));
console.log(str.slice(0));
console.log(str.substring(0));
console.log(str.substr(0, 2));
console.log(str.toUpperCase());
console.log(str.toLowerCase());

