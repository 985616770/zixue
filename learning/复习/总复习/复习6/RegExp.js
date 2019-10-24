/*
 * @Author: xuanji
 * @Date: 2019-10-24 20:06:57
 * @LastEditors: xuanji
 * @LastEditTime: 2019-10-24 20:39:37
 * @Description: 正则
 */
let str = '[JS] Lesson_01.mp4';
const reg = /le/gi;
let rs = reg.exec(str)
console.log(reg['$&']);

var result = 'background-color-left'.replace(/(-[a-z])/g,function (c){
  return c.substr(1).toUpperCase();
});
console.log(result);
