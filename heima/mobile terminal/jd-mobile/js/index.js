// 搜索栏的淡出效果
const search = function() {
  // 1.默认固定透明背景

  const searchBox = document.querySelector('.jd_search_box');
  const banner = document.querySelector('.jd_banner');
  const height = banner.offsetHeight;

  // 监听页面滚动
  window.onscroll = function() {
    const scrollTop =
      window.pageXOffset !== undefined
        ? window.pageYOffset
        : (document.compatMode || '') === 'CSS1Compat'
        ? document.documentElement.scrollTop
        : document.body.scrollTop;
    let opacity = 0;

    if (scrollTop < height) {
      // 2.当页面滚动的时候 -- 随着页面滚动 变透明
      opacity = (scrollTop / height) * 0.85;
    } else {
      // 当页面滚动的时候 -- 超过某个高度透明度不变
      opacity = 0.85;
    }
    searchBox.style.setProperty('background', `rgba(235, 10, 10,${opacity})`);
  };
};

// 轮播图的效果
const banner = function() {
  // 自动轮播图且无缝 定时器
  // 点要随着图片的轮播改变 根据索引切换
  // 滑动效果 利用touch事件
  // 滑动结束的时候 如果滑动的距离不超过屏幕的1/3 吸附回去 过渡
  // 滑动结束的时候 如果滑动的距离不超过屏幕的1/3  切换 滑动的方向,过渡

  // touch事件:
  // 绑定事件 addEventListener('', function() {})
  // 事件对象:
  // TouchList: 触摸点的集合
  // changeTouch: 改变的触摸点
  // targetTouches: 当前元素的触摸点集合
  // touches: 页面的触摸点集合

  // 轮播图
  const banner1 = document.querySelector('.jd_banner');
  // 屏幕的宽度
  const width = banner1.offsetWidth;
  // 图片容器
  const imageBox = document.querySelector('ul:first-child');

  // 点容器
  const pointBox = document.querySelector('ul:last-child');
  const points = pointBox.querySelectorAll('li');

  // 添加动画
  const addTransition = function() {
    // 加过渡
    imageBox.style.transition = 'all 0.2s';
    imageBox.style.webKitTransition = 'all 0.2s'; // 兼容
  };

  // 清过渡
  const removeTransition = function() {
    // 瞬间定位 清过渡 做位移
    imageBox.style.transition = 'none';
    imageBox.style.webKitTransition = 'none'; // 兼容
  };

  // 位移
  const setTransition = function(tran) {
    imageBox.style.transform = `translateX(${tran}px)`;
    imageBox.style.webKitTransform = `translateX(${tran}px)`;
  };

  // 程序的核心 index
  let index = 1;

  const setPoint = function() {
    const args = Array.prototype.slice.call(points);
    args.forEach(ele => {
      ele.classList.remove('now');
    });
    args[index - 1].classList.add('now');
  };

  // 定时器
  let time = setInterval(() => {
    index += 1;
    addTransition();
    setTransition(-index * width);
  }, 3000);

  // 需要等最后一张动画结束去判断 是否瞬间设定为第一张
  imageBox.addEventListener('transitionend', () => {
    if (index >= 9) {
      index = 1;
      removeTransition();
      setTransition(-index * width);
    }
    // 滑动也需无缝
    else if (index <= 0) {
      index = 8;
      removeTransition();
      setTransition(-index * width);
    }
    // 根据索引设置点
    // 此时此刻index的取值  1 --8

    setPoint();
  });

  // 绑定位置
  let startX = 0;
  let distanceX = 0;
  let isMove = false;

  imageBox.addEventListener('touchstart', e => {
    // 记录起始位置的x坐标
    clearInterval(time);
    startX = e.touches[0].clientX;
  });
  imageBox.addEventListener('touchmove', e => {
    const moveX = e.touches[0].clientX;
    distanceX = moveX - startX;
    // 元素的定位 = 当前的定位 + 手指移动的距离
    const translateX = -index * width + distanceX;
    removeTransition();
    setTransition(translateX);
    isMove = true;
  });
  imageBox.addEventListener('touchend', () => {
    // 使用移动的距离
    if (isMove) {
      if (Math.abs(distanceX) < width / 3) {
        // 吸附
        addTransition();
        setTransition(-index * width);
      } else {
        // 切换
        // left
        if (distanceX > 0) {
          index -= 1;
        } else {
          index += 1;
        }
        // right
        addTransition();
        setTransition(-index * width);
      }
    }
    isMove = false;
    startX = 0;
    distanceX = 0;
    // 加定时器
    clearInterval(time);
    time = setInterval(() => {
      index += 1;
      addTransition();
      setTransition(-index * width);
    }, 3000);
  });
};

// 时间的变化
const downTime = function() {
  let time1 = 2 * 60 * 60;
  const spans = document.querySelector('.sk .time').querySelectorAll('span');
  const time2 = setInterval(() => {
    time1 -= 1;
    const h = Math.floor(time1 / 3600);
    const m = Math.floor((time1 % 3600) / 60);
    const s = time1 % 60;
    spans[0].innerHTML = Math.floor(h / 10);
    spans[1].innerHTML = h % 10;
    spans[3].innerHTML = Math.floor(m / 10);
    spans[4].innerHTML = m % 10;
    spans[6].innerHTML = Math.floor(s / 10);
    spans[7].innerHTML = s % 10;
    if (time1 <= 0) {
      clearInterval(time2);
    }
  }, 1000);
};

window.onload = function() {
  // 顶部搜索
  search();
  // 轮播图
  banner();
  // 倒计时
  downTime();
};
