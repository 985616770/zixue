/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/@types/fullpage.js/index.d.ts" />
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-0-02 14:49:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-03 21:37:04
 */
$(function () {

    // 
    $('.container').fullpage({
        /* 配置参数*/
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        verticalCentered: false,
        navigation: true,
        afterLoad: function (link, index) {
            $('.section').eq(index - 1).addClass('now')
        },
        afterRender: function () {
            $('.more').on('click', function () {
               $.fn.fullpage.moveSectionDown() 
            })
        }
    })

})