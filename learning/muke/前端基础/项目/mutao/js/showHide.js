(function($) {
  'use strict';
  // transition 的兼容代码
  var transition = window.mt.transition;
  // 提取init 的公共部分
  function init($elem, hiddenCallBack) {
    if ($elem.is(':hidden')) {
      $elem.data('status', 'hidden');
      if (typeof hiddenCallBack === 'function') {
        hiddenCallBack();
      }
    } else {
      $elem.data('status', 'hidden');
    }
  }

  // 提取show的公共部分
  function show($elem, callback) {
    if ($elem.data('status') === 'show') {
      return;
    }
    if ($elem.data('status') === 'shown') {
      return;
    }
    $elem.data('status', 'show').trigger('show');
    if (typeof callback === 'function') {
      callback();
    }
  }
  // 提取hide的公共部分
  function hide($elem, callback) {
    if ($elem.data('status') === 'hide') {
      return;
    }
    if ($elem.data('status') === 'hidden') {
      return;
    }
    $elem.data('status', 'hide').trigger('hide');
    if (typeof callback === 'function') {
      callback();
    }
  }
  // 无动画效果的
  var slient = {
    init: init,
    show: function($elem) {
      show($elem, function() {
        $elem.show();
        $elem.data('status', 'shown').trigger('shown');
      });
    },
    hide: function($elem) {
      hide($elem, function() {
        $elem.hide();
        $elem.data('status', 'hidden').trigger('hidden');
      });
    }
  };

  // css3的动画效果
  var css3 = {
    fade: {
      init: function($elem) {
        css3._init($elem, 'fadeOut');
      },
      show: function($elem) {
        css3._show($elem, 'fadeOut');
      },
      hide: function($elem) {
        css3._hide($elem, 'fadeOut');
      }
    },
    slideUpDown: {
      init: function($elem) {
        $elem.height($elem.height());
        css3._init($elem, 'slideUpDownCollapse');
      },
      show: function($elem) {
        css3._show($elem, 'slideUpDownCollapse');
      },
      hide: function($elem) {
        css3._hide($elem, 'slideUpDownCollapse');
      }
    },
    slideLeftRight: {
      // 左右滚动
      init: function($elem) {
        $elem.width($elem.width());
        css3._init($elem, 'slideLeftRightCollapse');
      },
      show: function($elem) {
        css3._show($elem, 'slideLeftRightCollapse');
      },
      hide: function($elem) {
        css3._hide($elem, 'slideLeftRightCollapse');
      }
    },
    fadeSlideUpDown: {
      // 淡入淡出上下滚动
      init: function($elem) {
        $elem.height($elem.height());
        css3._init($elem, 'fadeOut slideUpDownCollapse');
      },
      show: function($elem) {
        css3._show($elem, 'fadeOut slideUpDownCollapse');
      },
      hide: function($elem) {
        css3._hide($elem, 'fadeOut slideUpDownCollapse');
      }
    },
    fadeSlideLeftRight: {
      // 淡入淡出左右滚动
      init: function($elem) {
        $elem.width($elem.width());
        css3._init($elem, 'fadeOut slideLeftRightCollapse');
      },
      show: function($elem) {
        css3._show($elem, 'fadeOut slideLeftRightCollapse');
      },
      hide: function($elem) {
        css3._hide($elem, 'fadeOut slideLeftRightCollapse');
      }
    }
  };
  // css3的初始化
  css3._init = function($elem, className) {
    $elem.addClass('transition');
    init($elem, function() {
      $elem.addClass(className);
    });
  };
  // css3的显示动画
  css3._show = function($elem, className) {
    show($elem, function() {
      // transition.end => 'transitionend 事件 需要兼容代码'
      $elem.off(transition.end).one(transition.end, function() {
        $elem.data('status', 'shown').trigger('shown');
      });
      $elem.show();
      // 异步清除任务,同步> 微任务> 回调
      setTimeout(function() {
        $elem.removeClass(className);
      });
    });
  };
  // css3的隐藏动画
  css3._hide = function($elem, className) {
    hide($elem, function() {
      // transition.end => 'transitionend 事件 需要兼容代码'
      $elem.off(transition.end).one(transition.end, function() {
        // 添加类名后,还是占据位置,需要display:none 来清除
        $elem.hide();
        $elem.data('status', 'hidden').trigger('hidden');
      });
      $elem.addClass(className);
    });
  };

  // jquery的显示隐藏
  var js = {
    fade: {
      // 淡入淡出
      init: function($elem) {
        js._init($elem);
      },
      show: function($elem) {
        js._show($elem, 'fadeIn');
      },
      hide: function($elem) {
        js._hide($elem, 'fadeOut');
      }
    },
    slideUpDown: {
      // 上下滚动
      init: function($elem) {
        js._init($elem);
      },
      show: function($elem) {
        js._show($elem, 'slideDown');
      },
      hide: function($elem) {
        js._hide($elem, 'slideUp');
      }
    },
    slideLeftRight: {
      init: function($elem) {
        js._customInit($elem, {
          width: 0,
          'padding-left': 0,
          'padding-right': 0
        });
      },
      show: function($elem) {
        js._customShow($elem);
      },
      hide: function($elem) {
        js._customHide($elem, {
          width: 0,
          'padding-left': 0,
          'padding-right': 0
        });
      }
    },
    fadeSlideUpDown: {
      init: function($elem) {
        js._customInit($elem, {
          opacity: 0,
          height: 0,
          'padding-top': 0,
          'padding-bottom': 0
        });
      },
      show: function($elem) {
        js._customShow($elem);
      },
      hide: function($elem) {
        js._customHide($elem, {
          opacity: 0,
          height: 0,
          'padding-top': 0,
          'padding-bottom': 0
        });
      }
    },
    fadeSlideLeftRight: {
      init: function($elem) {
        js._customInit($elem, {
          opacity: 0,
          width: 0,
          'padding-left': 0,
          'padding-right': 0
        });
      },
      show: function($elem) {
        js._customShow($elem);
      },
      hide: function($elem) {
        js._customHide($elem, {
          opacity: 0,
          width: 0,
          'padding-left': 0,
          'padding-right': 0
        });
      }
    }
  };
  // js的初始化
  js._init = function($elem, hiddenCallback) {
    $elem.removeClass('transition');
    init($elem, hiddenCallback);
  };
  // js 的自定义初始化
  js._customInit = function($elem, options) {
    var styles = {};
    for (var p in options) {
      styles[p] = $elem.css(p);
    }
    // 存储在data属性中的 styles 中
    $elem.data('styles', styles);
    js._init($elem, function() {
      $elem.css(options);
    });
  };
  // js显示
  js._show = function($elem, mode) {
    show($elem, function() {
      $elem.stop()[mode](function() {
        $elem.data('status', 'shown').trigger('shown');
      });
    });
  };
  // js自定义的显示
  js._customShow = function($elem) {
    show($elem, function() {
      $elem.show();
      $elem.stop().animate($elem.data('styles'), function() {
        $elem.data('status', 'shown').trigger('shown');
      });
    });
  };

  // js隐藏
  js._hide = function($elem, mode) {
    hide($elem, function() {
      $elem.stop()[mode](function() {
        $elem.data('status', 'hidden').trigger('hidden');
      });
    });
  };
  // js自定义的隐藏
  js._customHide = function($elem, options) {
    hide($elem, function() {
      $elem.stop().animate(options, function() {
        $elem.hide();
        $elem.data('status', 'hidden').trigger('hidden');
      });
    });
  };

  var defaults = {
    css3: false,
    js: false,
    animation: 'fade'
  };
  // 上面整合起来,使用一个函数暴露方法
  function showHide($elem, options) {
    var mode = null;
    if (options.css3 && transition.isSupport) {
      mode = css3[options.animation] || css3[defaults.animation];
    } else if (options.js) {
      mode = js[options.animation] || js[defaults.animation];
    } else {
      mode = slient;
    }
    mode.init($elem);
    return {
      show: $.proxy(mode.show, this, $elem),
      hide: $.proxy(mode.hide, this, $elem)
    };
  }

  $.fn.extend({
    showHide: function(option) {
      return this.each(function() {
        var $this = $(this),
          // 看传进来的参数,是方法还是对象
          options = $.extend(
            {},
            defaults,
            typeof option === 'object' && option
          ),
          mode = $this.data('showHide');

        // 单例模式,防止多次创建
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
