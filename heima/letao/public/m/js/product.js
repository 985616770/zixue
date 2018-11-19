/* TODO:  */
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});

$(() => {
  getProductData(CT.getParamsbyUrl().productId, data => {
    $('.mui-icon-spinner').remove();
    $('.mui-scroll').html(template('detail', data));
    mui('.mui-slider').slider({
      interval: 4000
    });
    /*数量选择初始化*/
    mui('.mui-numbox').numbox();
  });

  /* 重新加载 */
  $('.mui-icon-reload').on('tap', () => {
    $('.mui-scroll').html(
      '<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>'
    );
    getProductData(CT.getParamsbyUrl().productId, data => {
      $('.mui-icon-spinner').remove();
      $('.mui-scroll').html(template('detail', data));
      mui('.mui-slider').slider({
        interval: 4000
      });
      /*数量选择初始化*/
      mui('.mui-numbox').numbox();
    });
  });
  /*尺码选择*/
  $('.mui-scroll').on('tap', '.size', function() {
    const currSize = $(this);
    $('.size').removeClass('now');
    currSize.addClass('now');
  });

  /*
    加入购物车
    1.需要获取  数据（商品id 尺码 数量） 校验数据
    2.通过接口发送给后台 ajax
    3.成功  提示用户  添加成功  弹出一个对话框  去购物车查看
    4.失败  提示用户  添加失败
    5.防止二次提交
    */
  // eslint-disable-next-line prefer-arrow-callback
  $('.mui-btn-danger').on('tap', function() {
    // 1.需要获取数据
    const data1 = {
      productId: CT.getParamsbyUrl().productId,
      size: $('.size.now').html(),
      num: $('.mui-input-numbox').val()
    };
    // 2.数据检验
    if (!data1.productId) {
      mui.toast('商品异常');
      return false;
    }
    if (!data1.size) {
      mui.toast('please choose your size');
      return false;
    }
    if (!data1.num) {
      mui.toast('your choose has problem');
      return false;
    }
    // 3.发送后台
    CT.loginAjax({
      url: '/cart/addCart',
      type: 'post',
      data: data1,
      dataType: 'json',
      success(data) {
        if (data.success) {
          mui.confirm(
            '加入购物车成功，去购物车看看？',
            '温馨提示',
            ['去看看', '继续浏览'],
            e => {
              if (e.index === 0) {
                /* 按了第一个按钮 */
                location.href = CT.cartUrl;
              } else {
                /* 按了其他按钮 暂时处理 */
              }
            }
          );
        } else {
          /* 5.失败 */
          mui.toast('添加失败，请重试！please sign in');
        }
      }
    });
    // $.ajax({
    //   url: '/cart/addCart',
    //   type: 'post',
    //   data: data1,
    //   dataType: 'json',
    //   success(data) {
    //     /*4.成功*/
    //     if (data.success) {
    //       mui.confirm(
    //         '加入购物车成功，去购物车看看？',
    //         '温馨提示',
    //         ['去看看', '继续浏览'],
    //         e => {
    //           if (e.index === 0) {
    //             /* 按了第一个按钮 */
    //             location.href = 'user/cart.html';
    //           } else {
    //             /* 按了其他按钮 暂时处理 */
    //           }
    //         }
    //       );
    //     } else {
    //       /* 5.失败 */
    //       mui.toast('添加失败，请重试！please sign in');
    //     }
    //   }
    // });
    // 4.成功
    // 5.
    // 6.需要获取数据
  });

});

const getProductData = function(productId, callback) {
  $.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    data: {
      id: productId
    },
    dataType: 'json',
    success(data) {
      console.log(data);
      setTimeout(() => {
        // eslint-disable-next-line no-unused-expressions
        callback && callback(data);
      }, 1000);
    }
  });
};
