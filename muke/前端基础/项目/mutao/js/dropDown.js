// (function($) {
//   function dropdown(ele, options) {
//     var $ele = $(ele),
//       $layer = $ele.find('.dropdown-layer'),
//       activeClass = $ele.data('active') + '-active';
//     /*
// fade
// slideUpDown
// slideLeftRight
// fadeslideUpDown
// fadeslideLeftRight
// */
//     $layer.showHide(options);
//     $ele.hover(
//       function() {
//         $ele.addClass(activeClass);
//         $layer.showHide('show');
//       },
//       function() {
//         $ele.removeClass(activeClass);
//         $layer.showHide('hide');
//       }
//     );
//   }
//   var defaults = {
//     css3: true,
//     js: true,
//     animation: 'slideUpDown'
//   };

//   $.fn.extend({
//     dropdown: function(option) {
//       return this.each(function() {
//         var options = $.extend({}, defaults, option);
//         dropdown(this, options);
//       });
//     }
//   });
// })(jQuery);

//  构造函数版本
// 使用self 存 实例对象的指向

(function($) {
  function Dropdown($this, options) {
    this.$ele = $this;
    this.options = options;
    this.$layer = this.$ele.find('.dropdown-layer');
    this.activeClass = options.active + '-active';
    this._init();
  }
  Dropdown.DEFAULTS = {
    event: 'hover',
    css3: false,
    js: false,
    animation: 'slideUpDown',
    active: 'dropdown',
    delay: 0
  };
  Dropdown.prototype._init = function() {
    var self = this;
    this.$layer.showHide(this.options);
    this.$layer.on('show shown hide hidden', function(e) {
      self.$ele.trigger('dropdown-' + e.type);
    });
    if (this.options.event === 'click') {
      this.$ele.on('click', function(e) {
        self.show();
        e.stopPropagation();
      });
      $(document).on('click', $.proxy(this.hide, this));
    } else {
      // $.proxy(fun,zh指向)jQuery的方法
      this.$ele.hover($.proxy(this.show, this), $.proxy(this.hide, this));
    }
  };
  Dropdown.prototype.show = function() {
    var self = this;
    if (this.options.delay) {
      this.timer = setTimeout(function() {
        _show();
      }, this.options.delay);
    } else {
      _show();
    }

    function _show() {
      self.$ele.addClass(self.activeClass);
      self.$layer.showHide('show');
    }
  };
  Dropdown.prototype.hide = function() {
    if (this.options.delay) {
      clearTimeout(this.timer);
    }
    this.$ele.removeClass(this.activeClass);
    this.$layer.showHide('hide');
  };
  /* 
fade
slideUpDown
slideLeftRight
fadeslideUpDown
fadeslideLeftRight
*/

  $.fn.extend({
    dropdown: function(option) {
      return this.each(function() {
        var $this = $(this),
          dropdown = $this.data('dropdown');
        var options = $.extend(
          {},
          Dropdown.DEFAULTS,
          $(this).data(),
          typeof option === 'object' && option
        );
        if (!dropdown) {
          $this.data('dropdown', (dropdown = new Dropdown($this, options)));
        }
        if (typeof dropdown[option] === 'function') {
          dropdown[option]();
        }
      });
    }
  });
})(jQuery);
