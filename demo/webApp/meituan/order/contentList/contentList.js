/* eslint-disable no-undef */
(function() {
    'use strict';
    // 模板字符串
    const itemTmpl = `
  <div class="order-item">
    <div class="order-item-inner">
      <img class="item-img" src="$poi_pic" alt="" />
      <div class="item-right">
        <div class="item-top">
          <p class="order-name one-line">$poi_name</p>
          <div class="arrow"></div>
          <div class="order-state">$status_description</div>
        </div>
        <div class="item-bottom">$getProduct</div>
      </div>
    </div>
    $getComment
  </div>
  `;

    /**
     * @param {number} page: 页码
     * @param {boolean} isScroll 滚动状态
     */
    let page = 0;
    let isScroll = false;

    /**
     * 渲染具体价格
     * @param {arr} data
     */
    function getTotalPrice(data) {
        const str = `<div class="product-item">
                  <span>...</span>
                  <div class="p-total-count">
                  总计${data.product_count}个菜,实付<span class="total-price">${data.total}</span>元
                  </div>
                </div>`;
        return str;
    }

    /**
     * 渲染具体商品
     * @param {arr} data
     */
    function getProduct(data) {
        const list = data.product_list || [];
        list.push({ type: 'more' });
        let str = '';
        list.forEach(item => {
            if (item.type === 'more') {
                str += getTotalPrice(data);
            } else {
                str += `<div class= "product-item">
      ${item.product_name}
      <div class="p-count">x${item.product_count}
      </div>
      </div>`;
            }
        });
        return str;
    }
    /**
     * 获取评论
     * @param {object} data 获取的json数据 
     */
    function getComment(data) {
        const evaluation = !data.is_comment;
        if (evaluation) {
            return `<div class = "evaluation">
                <div class="evaluation-btn">评价</div>
              </div>`;
        }
        return '';
    }

    /**
     * 渲染模板
     * @param {arr} list
     */
    function initContetent(list) {
        page += 1;
        isScroll = true;
        list.forEach(item => {
            const str = itemTmpl
                .replace('$poi_pic', item.poi_pic)
                .replace('$poi_name', item.poi_name)
                .replace('$status_description', item.status_description)
                .replace('$getProduct', getProduct(item))
                .replace('$getComment', getComment(item));
            $('.content-list').append(str);
            isScroll = false;
        });
    }

    /**
     * 请求数据
     * @param {} params
     */
    const getList = () => {
        $.get('../../json/orders.json', function(data) {
            const list = data.data.digestlist || [];

            initContetent(list);
        });
    };
    /**
     * 添加事件
     */
    const addEvent = () => {
        window.addEventListener('scroll', () => {
            const scrollTop =
                document.documentElement.scrollTop ||
                document.documentElement.getBoundingClientRect().top;
            const { clientHeight } = document.documentElement;
            const { scrollHeight } = document.documentElement;
            const preNum = 30;
            if (scrollTop + clientHeight >= scrollHeight - preNum) {
                if (page < 3) {
                    if (isScroll) return;
                    getList();
                } else {
                    $('.loading').html('加载完成');
                }
            }
        });
    };
    /**
     * 初始化
     */
    const init = () => {
        getList();
        addEvent();
    };
    init();
})();
