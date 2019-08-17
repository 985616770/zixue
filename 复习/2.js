/*
 * @Author: xuanji
 * @Date: 2019-08-14 17:37:14
 * @LastEditors: xuanji
 * @LastEditTime: 2019-08-14 18:52:08
 * @Description: file content
 */
// DATE
var dt = new Date();
console.log(dt.getFullYear());
console.log(dt.getMonth());
console.log(dt.getDate());
console.log(dt.getHours());
console.log(dt.getMinutes());
console.log(dt.setSeconds());
console.log(dt.getDay());
console.log(dt.toString());
console.log(dt.toDateString());
console.log(dt.toLocaleDateString());
console.log(dt.toTimeString());
console.log(dt.toLocaleTimeString());
console.log(dt.valueOf());
function add(x, y, f) {
  return f(x) + f(y);
}

var max = add(-5, 3, Math.abs);
console.log(max);

// reduce 用法
var arr = [{ name: 'brick1' }, { name: 'brick2' }, { name: 'brick3' }];
var bricks = 'brick1, brick2, brick3, '; //已经堆好的砖

function carryBrick(arr, bricks) {
  return arr.reduce(function(prev, current, index, array) {
    if (index === 0) {
      return prev + current.name;
    } else if (index === array.length - 1) {
      return prev + ' & ' + current.name;
    } else {
      return prev + ', ' + current.name;
    }
  }, bricks);
}

console.log(carryBrick(arr, bricks));

// filter (array)
