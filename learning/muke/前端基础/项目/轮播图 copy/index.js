//  轮播图
/* 1. 获取脚标
   2. 绑定事件
*/

function getId(id) {
  return typeof id === 'string' ? document.getElementById(id) : id;
}

function addEvent(ele, type, func) {
  if (ele.addEventListener) {
    return ele.addEventListener(type, func);
  } else if (ele.attachEvent) {
    return ele.attachEvent('on' + type, func);
  } else {
    return (ele['on' + type] = func);
  }
}

function changeImg() {
  for (var i = 0; i < size; i++) {
    divS[i].style.display = 'none';
    dots[i].className = '';
  }
  divS[index].style.display = 'block';
  dots[index].className = 'active';
  for (var i = 0; i < size; i++) {
    divS[i].style.display = 'none';
    dots[i].className = '';
  }
  divS[index].style.display = 'block';
  dots[index].className = 'active';
}

function autoPlay() {
  timer = setInterval(function() {
    index++;
    console.log(index);
    if (index >= size) index = 0;
    changeImg();
  }, 3000);
}

function stopPlay() {
  if (timer) {
    clearInterval(timer);
  }
}

var banner = getId('banner'),
  timer = null,
  main = getId('main'),
  prev = getId('prev'),
  next = getId('next'),
  dots = getId('dots').getElementsByTagName('span'),
  dotS = getId('dots'),
  divS = banner.getElementsByTagName('div'),
  size = divS.length;

var index = 0;

// 点击切换下一张图片
addEvent(next, 'click', function() {
  index++;
  console.log(index);
  if (index >= size) index = 0;
  changeImg();
});
// 点击切换上一张图片
addEvent(prev, 'click', function() {
  index--;
  console.log(index);
  if (index <= -1) index = size - 1;
  changeImg();
});

addEvent(dotS, 'click', function(e) {
  if (e.target.tagName !== 'SPAN') {
    return;
  }
  for (var i = 0; i < size; i++) {
    dots[i].setAttribute('data-id', i);
    addEvent(dots[i], 'click', function() {
      index = this.dataset.id;
      changeImg();
    });
  }
  return console.log(1);
});

addEvent(main, 'mouseover', stopPlay);
addEvent(main, 'mouseout', autoPlay);

autoPlay();

// 菜单的显示隐藏
var subMenu = getId('sub-menu'),
  menuContent = getId('menu-content'),
  contentItems = menuContent.getElementsByClassName('content-item'),
  innerBoxes = subMenu.getElementsByClassName('inner-box');

for (var i = 0; i < contentItems.length; i++) {
  contentItems[i].setAttribute('data-id', i);
  addEvent(contentItems[i], 'mouseover', function() {
    subMenu.classList.remove('hide');
    for (var j = 0; j < innerBoxes.length; j++) {
      innerBoxes[j].style.display = 'none';
    }
    var idx = this.getAttribute('data-id');
    innerBoxes[idx].style.display = 'block';
  });
}
addEvent(banner, 'mouseout', function() {
  subMenu.classList.add('hide');
});

addEvent(menuContent, 'mouseout', function() {
  subMenu.classList.add('hide');
});
addEvent(subMenu, 'mouseover', function() {
  this.classList.remove('hide');
});
