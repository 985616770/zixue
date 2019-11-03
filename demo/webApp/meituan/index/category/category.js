(function($) {
  'use strict';
  // 类目的假数据
  let itemTmpl = `
<div class="category-item">
  <img src="$url" alt="" class="item-icon">
  <p class="item-name">$name</p>
</div>
`;

  function initCategory() {
    // 获取categories的数据
    $.get('../../json/head.json', function(data) {
      console.log(data);
      let list = data.data.primary_filter.splice(0, 8);
      list.forEach((v, i) => {
        let str = itemTmpl.replace('$url', v.url).replace('$name', v.name);

        $('.category-content').append(str);
      });
    });
  }
  /**
   * 绑定item的click事件
   * @param
   */
  function addClick() {
    $('.category-content').on('click', '.category-item', function() {
      console.log('即将跳转');
    });
  }
  function init() {
    initCategory();
    addClick();
  }
  init();
})(jQuery);
