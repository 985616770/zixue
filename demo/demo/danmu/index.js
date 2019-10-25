// 获取高度宽度
// 随机颜色
// 数据存储
// 移动动画
// 获取数据
// 清空数据
let data = ['ssss', 'aaaa', 'ddd'];
const box = document.querySelector('.dan_box');

function DanMu() {
  const width = box.offsetWidth;
  const height = box.offsetHeight;
  this.setDanmu();
  this.slide();
}

DanMu.prototype.getRandomColor = function() {
  const r = Math.floor(Math.random() * 255 + 1);
  const y = Math.floor(Math.random() * 255 + 1);
  const b = Math.floor(Math.random() * 255 + 1);
  return `rgb(${r}, ${y},${b})`;
};

DanMu.prototype.slide = function() {};

DanMu.prototype.setDanmu = function() {
  const inputGet = document.getElementById('btn-get');
  const btn_remove = document.getElementById('btn-remove');
  const btn_fa = document.getElementById('btn-fa');

  const property = ele => {
    let childNode = document.createElement('span');
    let ran = Math.floor(Math.random() * 400 + 1);
    box.appendChild(childNode);
    childNode.style.top = `${ran}px`;
    childNode.style.color = this.getRandomColor();
    childNode.style.fontSize = '50px';
    childNode.innerHTML = `${ele}`;
  };

  data.forEach(ele => {
    property(ele);
  });

  btn_fa.onclick = () => {
    data.push(inputGet.value);
    console.log(data);
    property(inputGet.value);
    inputGet.value = '';
  };
  btn_remove.onclick = () => {
    let spans = document.getElementsByTagName('span');
    const args = Array.prototype.slice.call(spans);
    args.forEach(ele => {
      box.removeChild(ele);
    });
    data.splice(0,data.length);
  };
};
new DanMu();
