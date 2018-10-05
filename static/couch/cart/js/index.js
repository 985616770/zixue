/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-0-02 14:49:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-05 13:56:26
 */
$(function () {
    $(".container").fullpage({
        /* 配置参数*/
        sectionsColor: [
            "#fadd67",
            "#84a2d4",
            "#ef674d",
            "#ffeedd",
            "#d04759",
            "#84d9ed",
            "#8ac060"
        ],
        verticalCentered: false,
        navigation: true,
        afterLoad: function (link, index) {
            $(".section")
                .eq(index - 1)
                .addClass("now");
        },
        afterRender: function () {
            $(".more").on("click", function () {
                $.fn.fullpage.moveSectionDown();
            });
            // 当第四屏动画结束的时候监听
            $(".screen04 .cart").on("transitionend", function () {
                $(".screen04 .address")
                    .show()
                    .find("img:last")
                    .fadeIn(1000);
                $(".screen04 .text").addClass("show");
            });
            $(".screen08").on("mousemove", function (e) {
                    $(this)
                        .find(".hand")
                        .css({
                            left:e.clientX +10,
                            top: e.clientY 
                        })
                }).find(".again")
                .on("click", function () {
                    //点击重新开始动画
                    $(".show, .now, .leaved")
                        .removeClass("show")
                        .removeClass("now")
                        .removeClass("leaved")
                    $(".content [style]").removeAttr("style");
                    $.fn.fullpage.moveTo(1);
                });
        },
        onLeave: function (index, nextIndex, direction) {
            if (index == 2 && nextIndex == 3) {
                // 第二页到第三页
                $(".section")
                    .eq(index - 1)
                    .addClass("leaved");
            } else if (index == 3 && nextIndex == 4) {
                // 第三页到第四页
                $(".section")
                    .eq(index - 1)
                    .addClass("leaved");
            } else if (index == 5 && nextIndex == 6) {
                // 第五页到第六页
                $(".section")
                    .eq(index - 1)
                    .addClass("leaved");
                $(".screen06 .box").addClass("show");
            } else if (index == 6 && nextIndex == 7) {
                // 第六页到第七页
                $(".screen07 .text").addClass("show");
                $(".screen07 .star img").each(function (i, item) {
                    $(this)
                        .delay(i * 0.5 * 1000)
                        .fadeIn();
                });
            }
        },
        scrollingSpeed: 1000
    });
});