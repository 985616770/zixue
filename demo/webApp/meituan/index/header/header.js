/* eslint-disable no-undef */
(function($) {
    /**
     * 页面滚动来,进行搜索栏的变化
     */
    function changeSearch() {
        window.addEventListener('scroll', function() {
            const scroll = document.documentElement.scrollTop;
            const $headerHeight = $('.header').height();
            const $contentHeight = $('.category-content').height();
            if (scroll >= $contentHeight + $headerHeight) {
                $('.header').addClass('header-active');
            } else {
                $('.header').removeClass('header-active');
            }
        });
    }

    function init() {
        changeSearch();
    }
    init();
})(Zepto);
