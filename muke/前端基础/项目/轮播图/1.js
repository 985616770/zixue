//使用面向对象思想
var imgShow = (function() {
  let $showBox,
    $imgBox,
    $imgLiAll,
    $tips,
    $tipsAll,
    showIndex,
    $leftBtn,
    $rightBtn,
    timer;
  return {
    //初始化函数
    init() {
      $showBox = document.querySelector('#banner'); //获取展示图片的盒子
      showBoxWidth = $showBox.clientWidth; //获取展示图片盒子的宽
      $imgBox = $showBox.querySelector('#box'); //获取存放图片的盒子
      $imgLiAll = $imgBox.children; //获取所有图片
      $tips = document.querySelector('#uu'); //获取放小圆点的盒子
      this.addIndex(); //添加index,创建小圆点，因为图片添加过后图片原本的数量发生改变，所以要在添加之前创建好小圆点
      $tipsAll = $tips.children; //获取所有的小圆点
      $leftBtn = document.querySelector('.left-btn'); //获取左边按钮
      $rightBtn = document.querySelector('.right-btn'); //获取右边按钮
      const $first = $imgLiAll[0], //获取第一张图片
        $last = $imgLiAll[$imgLiAll.length - 1]; //获取最后一张图片
      $imgBox.appendChild($first.cloneNode(true)); // 把第一张图片添加到最后一张
      $imgBox.insertBefore($last.cloneNode(true), $first); //把最后一张图片添加到第一张
      $imgBox.style.left = -showBoxWidth + 'px'; //减去一张图片的宽,让原本第一张图片显示
      this.showImg(0);
      this.autoPlay();
      this.event();
    },
    event() {
      //存放事件处理程序
      var _this = this; //因为事件中的this指向当前绑定的DOM对象，所以让this赋给一个变量
      $tips.onclick = function(e) {
        e = e || window.event; //兼容写法
        const target = e.target || e.srcElement; //兼容写法
        if (target.nodeName == 'LI') {
          // 点击小圆点传入index，实现点击小圆点切换当前图片
          _this.showImg(target.index);
          _this.autoPlay(); //重新调用自动播放,不让图片发生抽搐
        }
      };
      $leftBtn.onclick = function() {
        // 左按钮 点击让index-1 实现点击返回上一张
        _this.showImg(showIndex - 1);
        _this.autoPlay(); //重新调用自动播放,不让图片发生抽搐
      };
      $rightBtn.onclick = function() {
        // 右按钮 点击让index+1 实现点击往前一张
        _this.showImg(showIndex + 1);
        _this.autoPlay(); //重新调用自动播放,不让图片发生抽搐
      };
      $showBox.onmouseenter = function() {
        // 移入展现图片盒子,让按钮显示,同时让图片停止
        $leftBtn.style.display = 'block';
        $rightBtn.style.display = 'block';
        clearInterval(timer);
      };
      $showBox.onmouseleave = function() {
        // 移入展现图片盒子,让按钮隐藏,同时让图片继续运动
        $leftBtn.style.display = 'none';
        $rightBtn.style.display = 'none';
        _this.autoPlay();
      };
    },
    addIndex() {
      //循环所有图片创建小圆点
      for (let i = 0; i < $imgLiAll.length; i++) {
        let $li = document.createElement('li'); //创建li
        $li.index = i; //给每个小圆点添加index
        $tips.appendChild($li); //把创建好的li添加到放小圆点的盒子里
      }
    },
    showImg(index) {
      // 控制图片,小圆点移动的
      let max = $tipsAll.length - 1; //索引是 0 开头的所以要减一
      if (index > max) {
        //如果索引大于最大索引就让索引等于0,且让图片变成第一张
        index = 0;
        $imgBox.style.left = 0 + 'px';
      } else if (index < 0) {
        //如果索引小于0,就让索引等于最大索引,且让图片变成改变后的最后一张
        index = max;
        $imgBox.style.left = -showBoxWidth * (max + 2) + 'px';
      }
      showIndex = index; //将index存入一个变量中
      for (let i = 0; i < $tipsAll.length; i++) {
        // 清除所有小圆点的class
        $tipsAll[i].classList.remove('act');
      }
      // 给当前小圆点添加class
      $tipsAll[index].classList.add('act');
      //让图片也跟着动
      move($imgBox, 'left', -showBoxWidth * (index + 1)); // 使用了运动,让轮播图看起来像轮播
      // $imgBox.style.left = -showBoxWidth * (index + 1) + 'px'; //直接切换,无体验
    },
    autoPlay() {
      // 让图片自己动
      clearInterval(timer); //清除定时器
      timer = setInterval(() => {
        // 创建定时器
        this.showImg(showIndex + 1);
      }, 3000);
    }
  };
})();
