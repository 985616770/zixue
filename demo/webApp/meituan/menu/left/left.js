/* eslint-disable no-undef */
(function() {
  'use strict';
  // 左侧类目item模板字符串
  let itemTmpl = `
  <div class="left-item">
      <div class="item-text">$getItemContent</div>
  </div>
  `;
  /**
   * 获取item数据
   * @param {object} data
   */
  function getItemContent(data) {
    if (data.icon)
      return `<img class="item-icon" src="${data.icon}">${data.name} `;
    return data.name;
  }
  /**
   * 渲染列表
   * @param {Array} list
   */
  function inintContentList(list) {
    list.forEach(item => {
      const str = itemTmpl.replace('$getItemContent', getItemContent(item));
      const $target = $(str);
      $target.data('itemData', item);

      $('.left-bar-inner').append($target);
    });

    $('.left-item')
      .eq(0)
      .click();
  }
  /**
   * 请求数据
   * param
   */
  function getList() {
    $.get('../../json/food.json', function(data) {
      const { food_spu_tags } = data.data || [];
      window.food_spu_tags = food_spu_tags;
      inintContentList(window.food_spu_tags);
      window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee);
    });
  }

  function addClick() {
    $('.left-bar-inner').on('click', '.left-item', function(e) {
      const $target = $(e.currentTarget);
      $target.addClass('active');
      $target.siblings().removeClass('active');
      Right.refresh($target.data('itemData'));
    });
  }

  const init = () => {
    getList();
    addClick();
  };

  init();
})();
