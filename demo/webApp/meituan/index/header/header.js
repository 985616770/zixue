(function() {
  'use strict';
  function changeSearch() {
    window.addEventListener('scroll', function() {
      let scroll = document.documentElement.scrollTop;
      let $headerHeight = $('.header').height();
      let $contentHeight = $('.category-content').height();
      if (scroll >= $contentHeight + $headerHeight) {
        $('.header').addClass('header-active');
      }else{
        $('.header').removeClass('header-active');
      }
    });
  }

  function init() {
    changeSearch();
  }
  init();
})();
