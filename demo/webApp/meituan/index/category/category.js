(function($) {
    'use strict';
    // 类目的假数据
    let itemTmpl = `
<div class="category-item">
  <img src="$url" alt="" class="item-icon">
  <p class="item-name">$name</p>
</div>
`;
    /**
     * 获取头部菜单分类数据 且渲染
     */
    function initCategory() {
        // 获取categories的数据
        $.get('../../json/head.json', function(data) {
            console.log(data);
            let list = data.data.primary_filter.splice(0, 8);
            list.forEach((v, i) => {
                let str = itemTmpl
                    .replace('$url', v.url)
                    .replace('$name', v.name);

                $('.category-content').append(str);
            });
        });
    }
    /**
     * 绑定每一个item的click事件(事件委托)
     * @param
     */
    function addClick() {
        $('.category-content').on('tap', '.category-item', function() {
            console.log('即将跳转');
        });
    }
    /**
     * 进行初始化
     * 放在一起便以启动
     */
    function init() {
        initCategory();
        addClick();
    }
    init();
})(Zepto);
