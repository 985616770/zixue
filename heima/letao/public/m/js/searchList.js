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
    data => {
      // 渲染数据
      $('.ct_product').html(template('list', data));
    }
  );
  /* 3 . 用户点击搜索的时候: 根据新的关键词搜索商品*/
  $('.ct_search').on('tap', () => {
    let key = $.trim($('input').val());
    if (!key) {
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
      data => {
        // 渲染数据
        $('.ct_product').html(template('list', data));
        console.log(data);
      }
    );
  });
  /* 4. 用户点击排序的时候 : 根据排序的选项去进行排序(默认的时候是降序 再次点击的时候升序)*/
  $('.ct_order a').on('tap', function() {
    const $this = $(this);

    if (!$this.hasClass('now')) {
      // 箭头默认朝下
      $this
        .addClass('now')
        .siblings()
        .removeClass('now')
        .find('span')
        .removeClass('fa-angle-up')
        .addClass('fa-angle-down');
    } else {
      // 改箭头的方向
      // eslint-disable-next-line no-lonely-if
      if ($this.find('span').hasClass('fa-angle-down')) {
        $this
          .find('span')
          .removeClass('fa-angle-down')
          .addClass('fa-angle-up');
      } else {
        $this
          .find('span')
          .removeClass('fa-angle-up')
          .addClass('fa-angle-down');
      }
    }

    // 排序 参数改变
    const order = $this.attr('data-type');
    let orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
    let key = $.trim($('input').val());
    if (!key) {
      // mui 消息提示
      mui.toast('请输入关键字再搜索');
      return false;
    }
    const parames = {
      proName: key,
      page: 1,
      pageSize: 4
    };
    parames[order] = orderVal;
    getSearchData(parames, data => {
      // 渲染数据
      $('.ct_product').html(template('list', data));
    });
  });
  /* 5. 用户下拉的时候 根据当前条件刷新 上拉加载重置*/
  mui.init({
    pullRefresh: {
      container: '#refreshContainer',
      // 下拉容器
      down: {
        // eslint-disable-next-line object-shorthand
        callback: function() {
          const that = this;
          const key = $.trim($('input').val());
          if (!key) {
            // mui 消息提示
            mui.toast('请输入关键字再搜索');
            return false;
          }
          $('.ct_order a')
            .removeClass('now')
            .find('span')
            .removeClass('fa-angle-up')
            .addClass('fa-angle-down');
          getSearchData(
            {
              proName: key,
              page: 1,
              pageSize: 4
            },
            data => {
              setTimeout(() => {
                $('.ct_product').html(template('list', data));
                // 停止下拉刷新
                that.endPulldownToRefresh();
              }, 1000);
              // 渲染数据
            }
          );
        }
      },
      /* 6. 用户上拉的时候 加载下一页(没有数据不去加载了)*/
      up: {
        // eslint-disable-next-line object-shorthand
        callback: function() {
          const that = this;
          window.page++;
          const key = $.trim($('input').val());
          if (!key) {
            // mui 消息提示
            mui.toast('请输入关键字再搜索');
            return false;
          }
          $('.ct_order a')
            .removeClass('now')
            .find('span')
            .removeClass('fa-angle-up')
            .addClass('fa-angle-down');
          const order = $('.ct_order a.now').attr('data-type');
          let orderVal = $('.ct_order a.now')
            .find('span')
            .hasClass('fa-angle-up')
            ? 1
            : 2;
          const parames = {
            proName: key,
            page: window.page,
            pageSize: 4
          };
          parames[order] = orderVal;
          getSearchData(parames, data => {
            setTimeout(() => {
              $('.ct_product').append(template('list', data));
              // 判断数据长度
              if (data.data.length) {
                that.endPullupToRefresh();
              } else {
                // 停止下拉刷新
                that.endPullupToRefresh(true);
              }
            }, 1000);
            // 渲染数据
          });
        }
      }
    }
  });
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
      window.page = data.page;
      callback && callback(data);
    }
  });
};
