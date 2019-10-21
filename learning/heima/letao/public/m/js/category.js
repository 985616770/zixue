$(() => {
  // 一级分类 渲染
  getCategoryData((data) => {
    $('.cate_left ul').html(template('firstTemplate', data));
    let categoryId = $('.cate_left ul li:first-child')
      .find('a')
      .attr('data-id');
    render(categoryId);
  });
  // 二级分类 点击一级分类 渲染
  $('.cate_left').on('tap', 'a', function(e) {
    // 当前选中的时候不去加载
    if (
      $(this)
        .parent()
        .hasClass('now')
    )
      return false;
    // 样式的选中功能
    $('.cate_left li').removeClass('now');
    $(this)
      .parent()
      .addClass('now');
    // 数据的渲染
    render($(this).attr('data-id'));
  });
});
// 一级 数据获取
const getCategoryData = function(callback) {
  $.ajax({
    url: '/category/queryTopCategory',
    type: 'get',
    data: '',
    dataType: 'json',
    success(data) {
      callback && callback(data);
    }
  });
};
// 二级数据获取
const getSecondCategoryData = function(params, callback) {
  $.ajax({
    url: '/category/querySecondCategory',
    type: 'get',
    data: params,
    dataType: 'json',
    success(data) {
      callback && callback(data);
    }
  });
};
// xuanran
const render = function(Id) {
  getSecondCategoryData(
    {
      id: Id
    },
    (data) => {
      $('.cate_right ul').html(template('secondTemplate', data));
    }
  );
};
