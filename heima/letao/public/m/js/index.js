$(function () {
    // 页面滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false
    });
    // 轮播设置
    mui('.mui-slider').slider({
        interval:3000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
});