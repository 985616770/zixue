// 1.ajax异步加载

// 2.渲染页面和后台提供的地址保持一致
const render = (page) => {
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
      $('[data-page="' + data.page + '"]').addClass('now');
    },
  });
};

$(() => {
  // ajax
  $('.wrapper').on('click', function () {
    const page = $(this).parent().data('page');
    render(page);
    console.log(render(page));
    const historyUrl = $(this).attr('href');
    history.pushState(null, null, historyUrl);
    return false;
  });
});
