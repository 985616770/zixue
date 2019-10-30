(function($) {
  'use strict';

  class Tab {
    constructor($elem, options) {
      this.$elem = $elem;
      this.options = options;
      this.$items = this.$elem.find('.tab-item');
      this.$panels = this.$elem.find('.tab-panel');
      this.itemNum = this.$items.length;
      this.curIndex = this._getCorrectIndex(this.options.activeIndex);
      this._init();
    }
    _init() {
      var self = this, timer = null;
      // init show
      this.$items.removeClass('tab-item-active');
      this.$items.eq(this.curIndex).addClass('tab-item-active');
      this.$panels.eq(this.curIndex).show();
      this.$elem.trigger('tab-show', [
        this.curIndex,
        this.$panels[this.curIndex]
      ]);
      // trigger event
      this.$panels.on('show shown hide hidden', function (e) {
        self.$elem.trigger('tab-' + e.type, [self.$panels.index(this), this]);
      });
      // showHide init
      this.$panels.showHide(this.options);
      // bind event
      this.options.event =
        this.options.event === 'click' ? 'click' : 'mouseenter';
      this.$elem.on(this.options.event, '.tab-item', function () {
        var elem = this;
        if (self.options.delay) {
          // delay
          clearTimeout(timer);
          timer = setTimeout(function () {
            self.toggle(self.$items.index(elem));
          }, self.options.delay);
        }
        else {
          // immediate
          self.toggle(self.$items.index(elem));
        }
      });
      // auto
      if (this.options.interval && !isNaN(Number(this.options.interval))) {
        this.$elem.hover($.proxy(this.pause, this), $.proxy(this.auto, this));
        this.auto();
      }
    }
    _getCorrectIndex(index) {
      if (isNaN(Number(index)))
        return 0;
      if (index < 0)
        return this.itemNum - 1;
      if (index > this.itemNum - 1)
        return 0;
      return index;
    }
    toggle(index) {
      if (this.curIndex === index)
        return;
      this.$panels.eq(this.curIndex).showHide('hide');
      this.$panels.eq(index).showHide('show');
      this.$items.eq(this.curIndex).removeClass('tab-item-active');
      this.$items.eq(index).addClass('tab-item-active');
      this.curIndex = index;
    }
    auto() {
      var self = this;
      this.intervalId = setInterval(function () {
        self.toggle(self._getCorrectIndex(self.curIndex + 1));
      }, this.options.interval);
    }
    pause() {
      clearInterval(this.intervalId);
    }
  }
  Tab.DEFAULTS = {
    event: 'mouseenter', // click
    css3: false,
    js: false,
    animation: 'fade',
    activeIndex: 0,
    interval: 0,
    delay: 0
  };


  $.fn.extend({
    tab: function(option) {
      return this.each(function() {
        var $this = $(this),
          tab = $this.data('tab'),
          options = $.extend(
            {},
            Tab.DEFAULTS,
            $this.data(),
            typeof option === 'object' && option
          );

        if (!tab && typeof option !== 'object') return;

        if (!tab) {
          // first time
          $this.data('tab', (tab = new Tab($this, options)));
        }

        if (typeof tab[option] === 'function') {
          tab[option]();
        }
      });
    }
  });
})(jQuery);
