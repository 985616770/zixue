/*
 * @Author: xuanji
 * @Date: 2019-08-29 15:27:29
 * @LastEditors: xuanji
 * @LastEditTime: 2019-08-31 13:56:36
 * @Description: file content
 */
const property = ele => {
  let childNode = document.createElement('span');
  let ran = Math.floor(Math.random() * 400 + 1);
  box.appendChild(childNode);
  childNode.style.top = `${ran}px`;
  childNode.style.color = this.getRandomColor();
  childNode.style.fontSize = '50px';
  childNode.innerHTML = `${ele}`;
};
