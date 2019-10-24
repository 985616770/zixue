(function($) {
  'use strict';
  var transition = window.mt.transition;
  // 提取init公共部分
  function init($elem, hiddenCallback) {
    if ($elem.is(':hidden')) {
      $elem.data('status', 'hidden');
      if (typeof hiddenCallback === 'function') hiddenCallback();
    } else {
      $elem.data('status', 'shown');
    }
  }

  // 提取show公共部分

  function show($elem, callback) {
    if ($elem.data('status') === 'show') return;
    if ($elem.data('status') === 'shown') return;
    $elem.data('status', 'show').trigger('show');
    callback();
  }

  function hide($elem, callback) {
    if ($elem.data('status') === 'hide') return;
    if ($elem.data('status') === 'hidden') return;
    $elem.data('status', 'hide').trigger('hide');
    callback();
  }

  // 无特效调用 隐藏
  var slient = {
    init: init,
    // 发布-订阅模式
    show: function($ele) {
      show($ele, function() {
        $ele.show();
        $ele.data('status', 'shown').trigger('shown');
      });
    },
    hide: function($ele) {
      hide($ele, function() {
        $ele.hide();
        $ele.data('status', 'hidden').trigger('hidden');
      });
    }
  };

  var css3 = {
    fade: {
      //  提取公共样式
      init: function($ele) {
        css3._init($ele, 'fadeOut');
      },
      show: function($ele) {
        css3._show($ele, 'fadeOut');
      },
      hide: function($ele) {
        css3._hide($ele, 'fadeOut');
      }
    },
    slideUpDown: {
      //  初始化
      init: function($ele) {
        $ele.height($ele.height()); //获取高度(包括隐藏)
        css3._init($ele, 'slideUpDownCollapse');
      },
      show: function($ele) {
        css3._show($ele, 'slideUpDownCollapse');
      },
      hide: function($ele) {
        css3._hide($ele, 'slideUpDownCollapse');
      }
    },
    slideLeftRight: {
      init: function($ele) {
        $ele.width($ele.width()); //获取宽度包括隐藏)
        css3._init($ele, 'slideLeftRightCollapse');
      },
      show: function($ele) {
        css3._show($ele, 'slideLeftRightCollapse');
      },
      hide: function($ele) {
        css3._hide($ele, 'slideLeftRightCollapse');
      }
    },
    fadeslideUpDown: {
      init: function($ele) {
        $ele.height($ele.height()); //获取高度(包括隐藏)
        css3._init($ele, 'slideUpDownCollapse fadeOut');
      },
      show: function($ele) {
        css3._show($ele, 'slideUpDownCollapse fadeOut');
      },
      hide: function($ele) {
        css3._hide($ele, 'slideUpDownCollapse fadeOut');
      }
    },
    fadeslideLeftRight: {
      init: function($ele) {
        $ele.width($ele.width()); //获取宽度(包括隐藏)
        css3._init($ele, 'slideLeftRightCollapse fadeOut');
      },
      show: function($ele) {
        css3._show($ele, 'slideLeftRightCollapse fadeOut');
      },
      hide: function($ele) {
        css3._hide($ele, 'slideLeftRightCollapse fadeOut');
      }
    }
  };

  css3._init = function($ele, className) {
    $ele.addClass('transition');
    init($ele, function() {
      $ele.addClass(className);
    });
  };

  css3._show = function($ele, className) {
    show($ele, function() {
      // transitionend 需要做兼容处理
      $ele.off(transition.end).one(transition.end, function() {
        $ele.data('status', 'shown').trigger('shown');
      });
      $ele.show();
      setTimeout(function() {
        $ele.removeClass(className);
      }, 100);
    });
  };
  css3._hide = function($ele, className) {
    hide($ele, function() {
      // transitionend 需要做兼容处理
      $ele.off(transition.end).one(transition.end, function() {
        $ele.hide();
        $ele.data('status', 'hidden').trigger('hidden');
      });
      $ele.addClass(className);
    });
  };

  var js = {
    fade: {
      init: function($ele) {
        js._init($ele);
      },
      show: function($ele) {
        js._show($ele, 'fadeIn');
      },
      hide: function($ele) {
        js._hide($ele, 'fadeOut');
      }
    },
    slideUpDown: {
      init: function($ele) {
        js._init($ele);
      },
      show: function($ele) {
        js._show($ele, 'slideDown');
      },
      hide: function($ele) {
        js._hide($ele, 'slideUp');
      }
    },
    slideLeftRight: {
      init: function($ele) {
        js._customInit($ele, {
          width: 0,
          'padding-left': 0,
          'padding-right': 0
        });
      },
      show: function($ele) {
        js._customShow($ele);
      },
      hide: function($ele) {
        js._customHide($ele, {
          width: 0,
          'padding-left': 0,
          'padding-right': 0
        });
      }
    },
    fadeslideUpDown: {
      init: function($ele) {
        js._customInit($ele, {
          opacity: 0,
          height: 0,
          'padding-top': 0,
          'padding-bottom': 0
        });
      },
      show: function($ele) {
        js._customShow($ele);
      },
      hide: function($ele) {
        js._customHide($ele, {
          opacity: 0,
          height: 0,
          'padding-top': 0,
          'padding-bottom': 0
        });
      }
    },
    fadeslideLeftRight: {
      init: function($ele) {
        js._customInit($ele, {
          opacity: 0,
          width: 0,
          'padding-left': 0,
          'padding-right': 0
        });
      },
      show: function($ele) {
        js._customShow($ele);
      },
      hide: function($ele) {
        js._customHide($ele, {
          opacity: 0,
          width: 0,
          'padding-left': 0,
          'padding-right': 0
        });
      }
    }
  };
  js._init = function($ele, hiddenCallback) {
    $ele.removeClass('transition');
    init($ele, hiddenCallback);
  };
  js._customInit = function($ele, options) {
    var styles = {};
    for (var p in options) {
      styles[p] = $ele.css(p);
    }
    $ele.data('styles', styles);
    js._init($ele, function() {
      $ele.css(options);
    });
  };

  js._show = function($ele, mode) {
    show($ele, function() {
      $ele.stop()[mode](function() {
        $ele.data('status', 'shown').trigger('shown');
      });
    });
  };
  js._hide = function($ele, mode) {
    hide($ele, function() {
      $ele.stop()[mode](function() {
        $ele.data('status', 'hidden').trigger('hidden');
      });
    });
  };
  js._customShow = function($ele) {
    show($ele, function() {
      $ele.show();
      $ele.stop().animate($ele.data('styles'), function() {
        $ele.data('status', 'shown').trigger('shown');
      });
    });
  };
  js._customHide = function($ele, options) {
    hide($ele, function() {
      $ele.stop().animate(options, function() {
        $ele.hide();
        $ele.data('status', 'hidden').trigger('hidden');
      });
    });
  };

  var defaults = {
    css3: false,
    js: false,
    animation: 'fade'
  };

  function showHide($ele, options) {
    var mode = null;

    if (options.css3 && transition.isSupport) {
      mode = css3[options.animation] || css3[defaults.animation];
    } else if (options.js) {
      mode = js[options.animation] || js[defaults.animation];
    } else {
      mode = slient;
    }
    mode.init($ele);
    return {
      show: $.proxy(mode.show, this, $ele),
      hide: $.proxy(mode.hide, this, $ele)
    };
  }

  $.fn.extend({
    showHide: function(option) {
      return this.each(function() {
        var $this = $(this),
          options = $.extend(
            {},
            defaults,
            typeof option === 'object' && option
          ),
          mode = $this.data('showHide');
        // 存储单例,性能优化
        if (!mode) {
          $this.data('showHide', (mode = showHide($this, options)));
        }
        if (typeof mode[option] === 'function') {
          mode[option]();
        }
      });
    }
  });
})(jQuery);
