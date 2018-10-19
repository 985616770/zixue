const search = function() {
    // 1.默认固定透明背景

    const searchBox = document.querySelector(".jd_search_box");
    const banner = document.querySelector(".jd_banner");
    const height = banner.offsetHeight;

    // 监听页面滚动
    window.onscroll = function() {
        const scrollTop =
            window.pageXOffset !== undefined
                ? window.pageYOffset
                : (document.compatMode || "") === "CSS1Compat"
                    ? document.documentElement.scrollTop
                    : document.body.scrollTop;
        let opacity = 0;
        if (scrollTop < height) {
            // 2.当页面滚动的时候 -- 随着页面滚动 变透明
            opacity = (scrollTop / height) * 0.85;
        } else {
            // 当页面滚动的时候 -- 超过某个高度透明度不变
            opacity = 0.85;
        }
        searchBox.style.setProperty(
            "background",
            `rgba(235, 10, 10,${opacity})`
        );
    };
};

// touch事件:
// 绑定事件 addEventListener('', function() {})
// 事件对象:
// TouchList: 触摸点的集合
// changeTouch: 改变的触摸点
// targetTouches: 当前元素的触摸点集合
// touches: 页面的触摸点集合

const banner = function() {
    // 自动轮播图且无缝 定时器
    // 点要随着图片的轮播改变 根据索引切换
    // 滑动效果 利用touch事件
    // 滑动结束的时候 如果滑动的距离不超过屏幕的1/3 吸附回去 过渡
    // 滑动结束的时候 如果滑动的距离不超过屏幕的1/3  切换 滑动的方向,过渡

    // 轮播图
    const banner = document.querySelector(".jd_banner");
    // 屏幕的宽度
    const width = banner.offsetWidth;
    // 图片容器
    const imageBox = document.querySelector("ul:first-child");

    // 点容器
    const pointBox = document.querySelector("ul:last-child");
    const points = pointBox.querySelectorAll("li");

    // 程序的核心 index
    const index = 1;
    const timer = setInterval(() => {
        // 加过渡
        imageBox.style.transition = "all 0.2s";
        imageBox.style.webKitTransition = "all 0.2s"; // 兼容
    });
};

const downTime = function() {};
window.onload = function() {
    // 顶部搜索
    search();
    // 轮播图
    banner();
    // 倒计时
    downTime();
};
