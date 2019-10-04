// 下拉框模块载入
(function() {
  'use strict';
  // menu
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
    active: 'menu'
  });

  // search
  var $headerSearch = $('#header-search');
  var html = '';
  var maxNum = 10;

  $headerSearch
    .on('search-getData', function(e, data) {
      var $this = $(this);
      html = createHeaderSearchLayer(data, maxNum);
      // 将生成的html呈现在页面中
      $this.search('appendLayer', html);
      
      if (html) {
        console.log('1');
        
        $this.search('showLayer');
      } else {
        $this.search('hideLayer');
      }
    })
    .on('search-noData', function(e) {
      // 没获得数据处理
      $(this)
        .search('hideLayer')
        .search('appendLayer', '');
    })
    .on('click', '.search-layer-item', function() {
      // 点击每项时，提交
      $headerSearch.search('setInputVal', $(this).html());
      $headerSearch.search('submit');
    });

  $headerSearch.search({
    autocomplete: true,
    css3: false,
    js: false,
    animation: 'fade',
    getDataInterval: 0
  });
  // 获取数据，生成html
  function createHeaderSearchLayer(data, maxNum) {
    var html = '',
      dataNum = data['result'].length;

    if (dataNum === 0) {
      return '';
    }
    for (var i = 0; i < dataNum; i++) {
      if (i >= maxNum) break;
      html +=
        '<li class="search-layer-item text-ellipsis">' +
        data['result'][i][0] +
        '</li>';
    }
    return html;
  }
})();
// mdn []
