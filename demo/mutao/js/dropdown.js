(function($) {
  'use strict';
  class Dropdown {
    constructor($elem, options) {
      this.$elem = $elem;
      this.$layer = this.$elem.find('.dropdown-layer');
      this.options = options;
      this.activeClass = options.active + '-active';
      // 初始化
      this._init();
    }
    _init() {
      var self = this;
      this.$layer.showHide(this.options);
      this.$layer.on('show shown hide hidden', function (e) {
        self.$elem.trigger('dropdown-' + e.type);
      });
      if (this.options.event === 'click') {
        this.$elem.on('click', function (e) {
          self.show();
          e.stopPropagation();
        });
        $(document).click($.proxy(this.hide, this));
      }
      else {
        this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));
      }
    }
    hide() {
      if (this.options.delay) {
        clearTimeout(this.timer);
      }
      this.$layer.showHide('hide');
      this.$elem.removeClass(this.activeClass);
    }
    show() {
      var self = this;
      // 防止过快滑过,直接显示
      if (this.options.delay) {
        this.timer = setTimeout(function () {
          _show();
        }, this.options.delay);
      }
      else {
        _show();
      }
      function _show() {
        self.$elem.addClass(self.activeClass);
        self.$layer.showHide('show');
      }
    }
  }
  // 配置的默认信息
  Dropdown.DEFAULTS = {
    event: 'hover', // click
    css3: false,
    js: false,
    animation: 'fade',
    delay: 0,
    active: 'dropdown'
  };


  $.fn.extend({
    dropdown: function(option) {
      return this.each(function() {
        var $this = $(this),
          dropdown = $this.data('dropdown'),
          options = $.extend(
            {},
            Dropdown.DEFAULTS,
            $(this).data(),
            typeof option === 'object' && option
          );
        // 单例模式
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
