$('.menu').dropdown({
  css3: true,
  js: false,
  animation: 'fade',
  active: 'menu'
});

$('.menu').on('dropdown-show', function(e) {
  var $this = $(this),
    dataLoad = $this.data('load');

  if (!dataLoad) {
    return;
  }

  if (!$this.data('loaded')) {
    var $layer = $this.find('.dropdown-layer'),
      html = '';

    $.getJSON(dataLoad, function(data) {
      for (let i = 0; i < data.length; i++) {
        html += `<li><a href=${data[i].url}  class="menu-item">${data[i].name}</a></li>`;
      }
      $layer.html(html);
      $this.data('loaded', true);
    });
  }
});

function loadOnce($elem, success){
  var dataLoad = $elem.data('load')
  if(!dataLoad) return;
  if(!$elem.data('loaded')) {
    $elem.data
  }
};