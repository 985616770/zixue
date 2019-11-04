(function($) {
  'use strict';

  // 类目的假数据
  const itemTmpl = `
      <div class="r-item-content">
          <img src="$pic_url" alt="" class="item-img" />
          $brand
          <div class="item-info-content">
              <p class="item-title">$name</p>
              <div class="item-desc clearfix">
                  <div class="item-score">$wm_poi_score</div>
                  <div class="item-count">月售$mouthNum</div>
                  <div class="item-distance">&nbsp;$distance</div>
                  <div class="item-time">$mt_delivery_time&nbsp;|</div>
              </div>
              <div class="item-price">
              <div class="item-pre-price">$min_price_tip</div>
                  $meituanFlag
              </div>
              <div class="item-others">
                  $others
              </div>
          </div>
      </div>
`;
  let page = 0;
  let isScroll = false;
  function getList() {
    page++;
    isScroll = true;
    $.get('../../json/homelist.json', function(data) {
      const list = data.data.poilist || [];
      initContentList(list);
      isScroll = false;
    });
  }

  /**
   * 渲染品牌
   * @param {string} data 品牌or新到
   */
  function getBrand(data) {
    if (data.brand_type) {
      return `<div class="brand brand-pin">品牌</div>`;
    }
    return `<div class="brand brand-xin">新到</div>`;
  }
  /**
   * 渲染月售
   * @param {num}} data
   */
  function getMonthSale(data) {
    let num = data.month_sale_num;
    if (num > 999) {
      return `999+`;
    }
    return num;
  }
  /**
   * 获取其他活动
   * @param {object} data
   */
  function getOthers(data) {
    const arr = data.discounts2;
    let str = '';
    // 内部的模板字符串替换
    arr.forEach(item => {
      let _str = `
    <div class="other-info ">
    <img src=$icon_url class="other-tag">
    <p class="other-content one-line">$info</p>
    </div>
    `;
      // 替换数据
      _str = _str
        .replace('$icon_url', item.icon_url)
        .replace('$info', item.info);
      str += _str;
    });
    return str;
  }

  /**
   * 是否需要渲染美团专送tag
   * @param {*} data
   */
  function getMeituanFlag(data) {
    if (data.delivery_type) {
      return '<div class="item-meituan-flag">美团专送</div>';
    }

    return '';
  }
  /**
   * 渲染菜品栏
   * @param {Array} list : 获取的json数据
   */
  function initContentList(list) {
    list.forEach(ele => {
      const str = itemTmpl
        .replace('$pic_url', ele.pic_url)
        .replace('$name', ele.name)
        .replace('$distance', ele.distance)
        .replace('$min_price_tip', ele.min_price_tip)
        .replace('$brand', getBrand(ele))
        .replace('$mt_delivery_time', ele.mt_delivery_time)
        .replace('$mouthNum', getMonthSale(ele))
        .replace('$others', getOthers(ele))
        .replace('$wm_poi_score', new StarScore(ele.wm_poi_score).getStars())
        .replace('$meituanFlag', getMeituanFlag(ele));
      $('.list-warp').append($(str));
    });
  }

  function addEvent() {
    window.addEventListener('scroll', () => {
      const { clientHeight } = document.documentElement;
      const { scrollHeight } = document.body;

      const { scrollTop } = document.documentElement;
      // 阈值
      const proDis = 30;
      if (scrollTop + clientHeight >= scrollHeight - proDis) {
        // 最多三页
        if (page < 3) {
          // 在发送Ajax请求时,为true直接返回
          if (isScroll) {
            return;
          }
          // 请求再次渲染页面
          getList();
        } else {
          $('.loading').html('没了啊,还吃不吃啊');
        }
      }
    });
    let timer = null;
    $('.list-warp').on('touchend', '.r-item-content', function(e) {
      const $target = $(e.currentTarget);
      if (!$target) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        window.location = '../menu/menu.html';
      }, 1500);
    });
  }
  function init() {
    getList();
    addEvent();
  }
  init();
})(jQuery);
