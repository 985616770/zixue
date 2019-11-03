/* eslint-disable no-undef */
(function() {
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
})();
