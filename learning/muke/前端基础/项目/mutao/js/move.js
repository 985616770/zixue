(function() {
  'use strict';
  var transition = window.mt.transition;
  var init = function($elem) {
    this.$elem = $elem;
    this.curX = parseFloat(this.$elem.css('left'));
    this.curY = parseFloat(this.$elem.css('top'));
  };

  var to = function(x, y, callback) {
    x = typeof x === 'number' ? x : this.curX;
    y = typeof y === 'number' ? y : this.curX;
    if (this.curX === x && this.curY === y) {
      return;
    }

    this.$elem.trigger('move', [this.$elem]);
    if (typeof callback === 'function') {
      callback();
    }

    this.curX = x;
    this.curY = y;
  };

  var Slient = function($elem) {
    init.call(this, $elem); //改变this的指向，这里this指外面的this,如不使用call，this指init。
    this.$elem.removeClass('transition');
  };
  
  Slient.prototype.to = function(x, y) {
    var self = this;
    to.call(this, x, y, function() {
      self.$elem.css({
        left: x,
        top: y
      });
      self.$elem.trigger('moved', [self.$elem]);
    });
  };
  Slient.prototype.x = function(x) {
    this.to(x);
  };
  Slient.prototype.y = function(y) {
    this.to(null, y);
  };

  // css3 方式
  var Css3 = function($elem) {
    this.$elem = $elem;
    this.$elem.addClass('transition');
    this.curX = parseFloat(this.$elem.css('left'));
    this.curY = parseFloat(this.$elem.css('top'));
    this.$elem.css({
      left: this.curX,
      top: this.curY
    });
  };

  Css3.prototype.to = function(x, y) {
    var self = this;
    to.call(this, x, y, function() {
      self.$elem.off(transition.end).one(transition.end, function() {
        self.$elem.trigger('moved', [self.$elem]);
      });

      self.$elem.css({
        left: x,
        top: y
      });
    });
  };

  Css3.prototype.x = function(x) {
    this.to(x);
  };
  Css3.prototype.y = function(y) {
    this.to(null, y);
  };

  // js方式
  var Js = function($elem) {
    init.call(this, $elem);
    this.$elem.removeClass('transition');
  };

  Js.prototype.to = function(x, y) {
    var self = this;
    to.call(this, x, y, function() {
      self.$elem.stop().animate(
        {
          left: x,
          top: y
        },
        function() {
          self.$elem.trigger('moved', [self.$elem]);
        }
      );
    });
  };

  Js.prototype.x = function(x) {
    this.to(x);
  };
  Js.prototype.y = function(y) {
    this.to(null, y);
  };

  var defaults = {
    css3: false,
    js: false
  };

  var move = function($elem, options) {
    var mode = null;

    if (options.css3 && transition.isSupport) {
      // css3 transition
      mode = new Css3($elem);
    } else if (options.js) {
      // js animation
      mode = new Js($elem);
    } else {
      // no animation
      mode = new Slient($elem);
    }

    return {
      to: $.proxy(mode.to, mode), //改变指针this指向mode.
      x: $.proxy(mode.x, mode),
      y: $.proxy(mode.y, mode)
    };
  };

  $.fn.extend({
    move: function(option, x, y) {
      return this.each(function() {
        var $this = $(this),
          mode = $this.data('move'),
          options = $.extend(
            {},
            defaults,
            typeof option === 'object' && option
          );

        if (!mode) {
          // first time
          $this.data('move', (mode = move($this, options)));
        }

        if (typeof mode[option] === 'function') {
          mode[option](x, y);
        }
      });
    }
  });
})();
