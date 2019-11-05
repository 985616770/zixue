/* eslint-disable no-undef */
(function() {
    // 左侧类目item模板字符串
    const itemTmpl = `
  <div class="menu-item">
    <img class="img" src ="$picture">
    <div class="menu-item-right">
        <p class="item-title">$name</p>
        <p class="item-desc two-line">$description</p>
        <p class="item-zan">$praise_content</p>
        <p class="item-price">¥$min_price </p>
    </div>
    <div class= "select-content">
        <div class="minus"></div>
        <div class="count">
            $chooseCount
        </div>
        <div class="plus"></div>
    </div>
  </div>
  `;

    /**
     * 渲染列表
     * @param {Array} list
     */
    function initRightItem(list) {
        $('.right-list-inner').html('');
        list.forEach(item => {
            if (!item.chooseCount) item.chooseCount = '0';
            const str = itemTmpl
                .replace('$picture', item.picture)
                .replace('$name', item.name)
                .replace('$description', item.description)
                .replace('$praise_content', item.praise_content)
                .replace('$min_price', item.min_price)
                .replace('$chooseCount', item.chooseCount);
            const $str = $(str);

            $.data($str, 'itemData', item);

            $('.right-list-inner').append($str);
        });
    }
    /**
     * 渲染标题
     * @param {String} str
     */
    function initRightTitle(str) {
        $('.right-title').text(str);
    }
    /**
     * 添加tap事件
     */
    function addTap() {
        // 给减号 添加事件
        $('.menu-item').on('tap', '.minus', function(e) {
            let $count = $(e.currentTarget)
                .parent()
                .find('.count');
            let num = parseInt($count.html());
            num--;
            num = num < 0 ? 0 : num;
            $count.html(num);
            if (num === 0) return;
            let $itemData = $(e.currentTarget)
                .parents('.menu-item')
                .first()
                .data('itemData');

            $itemData.chooseCount = num;

            window.ShopBar.renderItem();
        });
        // 给加号 添加事件
        $('.menu-item').on('tap', '.plus', function(e) {
            let $count = $(e.currentTarget)
                .parent()
                .find('.count');

            $count.html(parseInt($count.html()) + 1);

            let $itemData = $(e.currentTarget)
                .parents('.menu-item')
                .first()
                .data('itemData');

            $itemData.chooseCount = parseInt($count.html());
            window.ShopBar.renderItem();
        });
    }
    // 初始化
    const init = data => {
        initRightItem(data.spus || []);
        initRightTitle(data.name);
        addTap();
    };
    // 暴露方法给全局
    window.Right = {
        refresh: init
    };
})();
