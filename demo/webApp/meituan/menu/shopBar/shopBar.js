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
    /**
     * 渲染右侧的点餐数据
     */
    function renderItem() {
        // 每次渲染 清除上次的数据
        $($strTop)
            .find('.choose-item')
            .remove();
        let list = window.food_spu_tags || [];
        // 定义显示的模板字符串
        let tmpl = `
            <div class="choose-item">
                <div class="item-name one-line">$name</div >
                <div class="price">¥<span class="total">$price</span></div>
                <div class= "select-content">
                    <div class="minus"></div>
                    <div class="count">$chooseCount</div>
                    <div class="plus"></div>
                </div>
            </div>
  `;
        let totalPrice = 0;
        // 为点击数值 渲染
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

                    $.data($row, 'itemData', item);
                    $($strTop).append($row);
                }
            });
        });
        // 改变总价 及 改变 红点
        changeTotalPrice(totalPrice);
        changeDots();
    }
    /**
     * 改变红点的数值
     */
    function changeDots() {
        // 在添加的item中
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
    /**
     * 改变总价
     * @param {object} str
     */
    function changeTotalPrice(str) {
        $strBottom.find('.total-price-span').html(str);
    }
    /**
     * 改变配送费
     * @param {object} str
     */
    function changeShippingPrice(str) {
        $strBottom.find('.shopping-fee').html(str);
    }
    /**
     * 添加tap事件
     */
    function addTap() {
        $strTop.on('tap', '.minus', function(e) {
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
        $strTop.on('tap', '.plus', function(e) {
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
        $strBottom.on('tap', '.shop-icon', function() {
            $('.mask').toggle();
            $strTop.toggle();
        });
    }
    /**
     * 初始化
     */
    function init() {
        $('.shop-bar').append($strTop);
        $('.shop-bar').append($strBottom);
        addTap();
    }

    window.ShopBar = {
        renderItem,
        changeShippingPrice
    };
    init();
})();
