(function($) {
  function dropdown(elem) {
    var $elem = $(elem),
      $layer = $elem.find('.dropdown-layer'),
      activeClass = $elem.data('active') + '-active';
    /* 
fade
slideUpDown
slideLeftRight
fadeslideUpDown
fadeslideLeftRight
*/
    $layer.showHide({
      css3: false,
      js: true,
      animation: 'fadeslideUpDown'
    });
    $elem.hover(
      function() {
        $elem.addClass(activeClass);
        $layer.showHide('show');
      },
      function() {
        $elem.removeClass(activeClass);
        $layer.showHide('hide');
      }
    );
  }

  $.fn.extend({
    dropdown: function() {
      return this.each(function() {
        dropdown(this);
      });
    }
  });
})(jQuery);
