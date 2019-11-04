/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-undef */
(function() {
  'use strict';

  // 顶部模板字符串
  let itemTopTmpl = `<div class="choose-content hide">
                      <div class="content-top">
                          <div class="clear-car">清空购物车</div>
                      </div>
                  </div>`;

  // 底部模板字符串
  let itemBottomTmpl = `
                    <div class="bottom-content">
                        <div class="shop-icon">
                            <div class="dot-num hide"></div>
                        </div>
                        <div class="price-content">
                            <p class="total-price">¥<span class="total-price-span">0</span></p>
                            <div class="other-price">另需配送¥<span class="shopping-fee">0</span></div>
                        </div>
                        <div class="submit-btn">去结算</div>
                    </div>
  `;

  // 挂载data数据 转换成jq对象
  let $strBottom = $(itemBottomTmpl);
  let $strTop = $(itemTopTmpl);

  function renderItem() {
    $($strTop)
      .find('.choose-item')
      .remove();
    let list = window.food_spu_tags || [];
    let tmpl = `
            <div class="choose-item">
                <div class="item-name">$name</div >
                <div class="price">¥<span class="total">$price</span></div>
                <div class= "select-content">
                    <div class="minus"></div>
                    <div class="count">$chooseCount</div>
                    <div class="plus"></div>
                </div>
            </div>
  `;
    let totalPrice = 0;
    list.forEach(item => {
      item.spus.forEach(item => {
        // 有菜品大于0 就执行
        if (item.chooseCount > 0) {
          let price = item.min_price * item.chooseCount;
          let row = tmpl
            .replace('$name', item.name)
            .replace('$price', price)
            .replace('$chooseCount', item.chooseCount);
          totalPrice += price;

          let $row = $(row);

          $row.data('itemData', item);
          $($strTop).append($row);
        }
      });
    });
    changeTotalPrice(totalPrice);
    changeDots();
  }

  function changeDots() {
    let $counts = $strTop.find('.count');

    let dot = 0;
    for (let i = 0; i < $counts.length; i++) {
      let num = parseInt($($counts[i]).html());

      console.log(num);
      dot += num;
      if (dot > 0) {
        $('.dot-num')
          .show()
          .html(dot);
      } else {
        $('.dot-num').hide();
      }
    }
  }

  function changeTotalPrice(str) {
    $strBottom.find('.total-price-span').html(str);
  }
  function changeShippingPrice(str) {
    $strBottom.find('.shopping-fee').html(str);
  }
  function addClick() {
    $strTop.on('click', '.minus', function(e) {
      let $count = $(e.currentTarget)
        .parent()
        .find('.count');
      let num = parseInt($count.html());
      num--;
      num = num < 0 ? 0 : num;
      $count.html(num);
      if (num === 0) return;
      let $itemData = $(e.currentTarget)
        .parents('.choose-item')
        .first()
        .data('itemData');

      $itemData.chooseCount = num;
      // 重新渲染
      renderItem();
      $('.left-item.active').click();
    });
    $strTop.on('click', '.plus', function(e) {
      let $count = $(e.currentTarget)
        .parent()
        .find('.count');

      $count.html(parseInt($count.html()) + 1);

      let $itemData = $(e.currentTarget)
        .parents('.choose-item')
        .first()
        .data('itemData');

      $itemData.chooseCount = parseInt($count.html());
      // 重新渲染
      renderItem();
      $('.left-item.active').click();
    });
    $strBottom.on('click', '.shop-icon', function() {
      $('.mask').toggle();
      $strTop.toggle();
    });
  }
  function init() {
    $('.shop-bar').append($strTop);
    $('.shop-bar').append($strBottom);
    addClick();
  }

  window.ShopBar = {
    renderItem,
    changeShippingPrice
  };
  init();
})();
