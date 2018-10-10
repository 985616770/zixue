/// <reference path="../node_modules/@types/jquery/index.d.ts" />
$(function () {
    $.stellar({
        horizontalScrolling: false,
        responsive: true
    })
});
window.onload = function () {
    document.querySelector('.nav').onclick = function (e) {
        var currentLi = e.target;
        currentLi
    }
}
document.querySelectorAll('selector');