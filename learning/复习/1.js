/*
 * @Author: xuanji
 * @Date: 2019-08-14 11:07:14
 * @LastEditors: xuanji
 * @LastEditTime: 2019-08-18 10:41:19
 * @Description: file content
 */

//数组
var arr = [1, 23, 44];

console.log(arr.length);
console.log(arr[2]);
console.log(arr.indexOf(23));
arr.unshift(22);
console.log(arr);
arr.sort();
console.log(arr);
arr.reverse();

console.log(arr);
arr.push(33);
console.log(arr);
arr.pop();
console.log(arr);
arr.splice(1, 2, 31, 333);
console.log(arr);

var arr2 = [2, 2, 2, 2];
var arrAll = arr.concat(arr2);
console.log(arrAll);

console.log(arrAll.join('-'));

// 字符串
var S = 'asdf';

console.log(S.length);
S.toLocaleLowerCase();
console.log(S);

console.log(S.toUpperCase());
console.log(S.indexOf('s'));
console.log(S.substring(1, 3));

// 对象
var xiao = { name: 'xm', birth: 1990, school: 'NO.1 midimschoo' };
console.log(xiao['name']);
console.log(xiao['birth']);
delete xiao.school;
console.log(xiao);
console.log('name' in xiao);
console.log(xiao.hasOwnProperty('name')); // 检测自身是否拥有

// MAP AND SET

var m = new Map([['mi', 95], ['aa', 22]]);
var json = {
  name: 'xiaoming',
  age: '10'
};
for (const key in json) {
  console.log(json[key]);
}

// 解构赋值
const [x, y, z] = ['hello', 'wu', 'ss'];
const person = ['hello', 'wu', 'ss'];

console.log(x, y, z);
const [a, b, c] = person;
console.log(a, b, c);
function whoIs({ displayName: displayName, fullName: { firstName: name } }) {
  console.log(displayName + ' is ' + name);
}

var user = {
  id: 42,
  displayName: 'jdoe',
  fullName: { firstName: 'John', lastName: 'doe' }
};
whoIs(user);
const { length: len } = 'abc';
const { toString: s } = 123;

var person = {};
person.name = 'coco';
person.age = 23;
person.sayName = function () {
  console.log(person.name);
};
delete person.name;
person.sayName();
var as = Math.max.apply(null, [3, 3, 2]);
console.log(as);

function toDo(is) {
  var is = 11;
  let a = [];
}