/* eslint-disable spaced-comment */
$(() => {
  mui('.mui-scroll-wrapper').scroll({
    indicator: false
  });
  /* 1 .页面初始化的时候: 关键词在输入框内显示*/

  const urlparams = CT.getParamsbyUrl();
  const $input = $('input').val(urlparams.key || '');

  /* 2 . 页面初始化的时候: 根据关键字查询第一页数据4条*/
  getSearchData(
    {
      proName: $input.val(),
      page: 1,
      pageSize: 4
    },
    (data) => {
      // 渲染数据
      $('.ct_product').html(template('list', data));
    }
  );
  /* 3 . 用户点击搜索的时候: 根据新的关键词搜索商品*/
  $('.ct_search').on('tap' () => {
    let key = $.trim($('input').val());
    if ( !key) {
      // mui 消息提示
      mui.toast('请输入关键字再搜索');
      return false;
    }
    getSearchData(
      {
        proName: key,
        page: 1,
        pageSize: 4
      },
      (data) => {
        // 渲染数据
        $('.ct_product').html(template('list', data));
      }
    );
  })
  /* 4. 用户点击排序的时候 : 根据排序的选项去进行排序(默认的时候是降序 再次点击的时候升序)*/

  /* 5. 用户下拉的时候 根据当前条件刷新 上拉加载重置*/

  /* 6. 用户上拉的时候 加载下一页(没有数据不去加载了)*/
});
const getSearchData = function(params, callback) {
  $.ajax({
    url: '/product/queryProduct',
    type: 'get',
    data: params,
    dataType: 'json',
    // eslint-disable-next-line object-shorthand
    success: function(data) {
      // eslint-disable-next-line no-unused-expressions
      callback && callback(data);
    }
  });
};
