/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/*
 * @Author: xuanjidd
 * @Date: 2018-07-24 15:06:07
 * @Last Modified by: xaunjidd
 * @Last Modified time: 2018-07-24 15:37:32
 *
 * 第十一章  DOM拓展
 */

// 11.1.1querySelector()方法
// body 元素
const body = document.querySelector('body');
// id 为#mydiv
const myDiv = document.querySelector('#myDiv');

// 取得类为"selected"第一个元素
const selected = document.querySelector('.selected');

// 取得类为"button"的第一个图像元素

const img = document.body.querySelector('img.button');

// 11.1.2 querySelectorAll()方法

const ems = document.querySelector('selected');

// matchesSelector() 方法

if (document.matchesSelector('div.ss')) {
  // true 返回
} else {
  // false 返回
}

// html5

const classP = document.getElementsByClassName('current'); // 直接敲class的名字

// classList 属性

const classNames = div.className.split(/\s+/);
let pos = -1;
let i;
let len;
for (i = 0, len = classNames.length; i < len; i++) {
  if (classNames[i] === 'user') {
    pos = i;
    break;
  }
}

classNames.splice(i, 1);
div.className = classNames.join(' '); // 复杂的写法
// classList 写法
div.classList.add('current'); // add
div.classList.remove('current'); // remove
div.classList.contains('current'); // bool
div.classList.toggle('current'); // if have delete or add

// 焦点管理

const button = document.getElementById('myButton');
button.focus(); // 代码实现焦点应用
button.hasFocus(); // 检测是否用户在和页面交互

// htmlDocument 的变化

/*
 * readyState属性
 * 兼容模式
 * head属性
 */

// 字符集属性

console.log(document.charset);
console.log(document.defaultCharset);

// 自定义数据属性

const div = document.getElementById('mt');

// eslint-disable-next-line prefer-destructuring
const appId = div.dataset.appId;
div.dataset.appId = 123;
if (div.dataset.appId) {
  // do something
}

// 插入标记
/**
 * 1. innerHTML 子节点
 * 2. outerHTML 子树(包括本身)
 * 3. insertAdjacentHTML(position,text) 插入 
 * beforebegin afterbegin beforeend afterend
 */

// scrollIntiView() 方法 页面滚动

// 专有拓展
/**
 * 1. 文档模式 ie
 * 2. children属性
 * 3. contains 方法
 * 4. 插入文本 innerText outerText
 * 
 */ 