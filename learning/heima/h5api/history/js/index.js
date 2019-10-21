// 1.ajax异步加载

// 2.渲染页面和后台提供的地址保持一致

// 3.切换历史渲染页面

const render = (page) => {
  // 怎么调用ajax请求方式 请求地址 请求参数 返回数据结构
  // 发出请求
  $.ajax({
    type: 'get',
    url: '../api/data.php',
    data: {
      page,
    },
    dataType: 'json',
    success: (data) => {
      $('[data-page]').removeClass('now');
      $('.content').html(data.html);
      $(`[data-page="${data.page}"]`).addClass('now');
    },
  });
};

$(() => {
  // 渲染页面 页面标识
  $('.wrapper').on('click', 'a', function () {
    const page = $(this).parent().data('page');
    render(page);
    // 地址保持一致
    // 追加地址  而且这个地址后台一定要存在
    const historyUrl = $(this).attr('href');
    history.pushState(null, null, historyUrl);
    return false;
  });
  // 监听切换历史
  window.onpopstate = function () {
    // 获取地址栏信息
    const { pathname } = location;
    let page = 'index';
    if (pathname.indexOf('index.php') > -1) {
      page = 'index';
    } else if (pathname.indexOf('my.php') > -1) {
      page = 'my';
    } else if (pathname.indexOf('friend.php') > -1) {
      page = 'friend';
    }
    render(page);
  };
});
