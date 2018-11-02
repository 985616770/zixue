$(() => {
  banner();
});

const banner = function() {
  // 动态轮播图
  // 根据数据动态渲染

  // 准备数据 转化成HTML 格式的字符串( 动态创建元素 字符串拼接 模版引擎)
  // 把字符串渲染到页面上

  // 数据缓存
  const getData = function(callback) {
    if (window.data) {
      callback && callback(window.data);
    } else {
      $.ajax({
        type: 'get',
        url: 'js/data.json',
        dataType: 'json', // 强制转换为json对象 不成功就报错
        data: '',
        success(data) {
          window.data = data;
          callback && callback(window.data);
        }
      });
    }
  };
  // 模版渲染
  const render = function() {
    getData(data => {
      let isMobile = $(window).width() < 768 ? true : false;
      // 动态渲染数据 静态内容变为HTML动态生成的 点 图片容器 新建模版 开始使用
      const pointHtml = template('pointTemplate', { list: data });
      const imageHtml = template('imageTemplate', {
        list: data,
        isM: isMobile
      });
      $('.carousel-indicators').html(pointHtml);
      $('.carousel-inner').html(imageHtml);
    });
  };
  render();
  // 测试功能
  $(window)
    .on('resize', () => {
      render();
    })
    .trigger('resize');

  let startX = 0;
  let distanceX = 0;
  let isMove = false;
  $('.wjs_banner')
    .on('touchstart', e => {
      startX = e.originalEvent.touches[0].clientX;
    })
    .on('touchmove', e => {
      let moveX = e.originalEvent.touches[0].clientX;
      distanceX = moveX - startX;
      isMove = true;
    })
    .on('touchend', e => {
      if (isMove && Math.abs(distanceX) > 50) {
        if (distanceX < 0) {
          // console.log('next');
          $('.carousel').carousel('next');
        } else {
          // console.log('prev');
          $('.carousel').carousel('prev');
        }
      }
      startX = 0;
      distanceX = 0;
      isMove = false;
    });
};
