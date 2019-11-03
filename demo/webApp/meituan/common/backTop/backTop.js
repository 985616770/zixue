(function() {
  'use strict';

  function addEvent() {
    let timer = null;
    window.addEventListener(
      'scroll',
      () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          let clientHeight = document.documentElement.clientHeight;
          let scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          let pre = 30;
          if (clientHeight + scrollTop >= clientHeight + pre) {
            $('#backTop').fadeIn('slow');
          } else {
            $('#backTop').fadeOut('slow');
          }
        });
      },
      300
    );

    $('#backTop').on('click', function() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    $('#backTop').on('touchstart', function() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }

  function init() {
    addEvent();
  }
  init();
})();
