// 下拉框模块载入
(function() {
  'use strict';
  $('.dropdown').on('dropdown-show', function(e) {
    var $this = $(this),
      dataLoad = $this.data('load');
    if (!dataLoad) return;

    if (!$this.data('loaded')) {
      var $layer = $this.find('.dropdown-layer'),
        html = '';
      $.getJSON(dataLoad, function(data) {
        setTimeout(function() {
          for (var i = 0; i < data.length; i++) {
            html +=
              '<li><a href="' +
              data[i].url +
              '" target="_blank" class="menu-item">' +
              data[i].name +
              '</a></li>';
          }
          $layer.html(html);
          $this.data('loaded', true);
        }, 500);
      });
    }
  });
  $('.dropdown').dropdown({
    event: '',
    css3: false,
    js: true,
    animation: 'fade',
    active: 'menu',
    delay: 0
  });
})();
// mdn []