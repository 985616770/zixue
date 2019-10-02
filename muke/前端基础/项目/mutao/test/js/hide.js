var transition = window.mt.transition;

// 无特效调用 隐藏
var slient = {
  init: function($ele) {
    init($ele);
  },

  // 发布-订阅模式
  show: function($ele) {
    show($ele);
    $ele.show();
    $ele.data('status', 'shown').trigger('shown');
  },
  hide: function($ele) {
    hide($ele);
    $ele.hide();
    $ele.data('status', 'hidden').trigger('hidden');
  }
};
// 初始化共同部分
function init($ele, callback) {
  if ($ele.is(':hidden')) {
    $ele.data('status', 'hidden');
    callback();
  } else {
    $ele.data('status', 'shown');
  }
}
// 显示部分通用代码
function show($ele, callback) {
  if ($ele.data('status') == 'show') return;
  if ($ele.data('status') == 'shown') return;
  $ele.data('status', 'show').trigger('show');
  // 继续执行的代码
  if (typeof callback === 'function') callback();
}
// 隐藏部分通用代码
function hide($ele, callback) {
  if ($ele.data('status') == 'hide') return;
  if ($ele.data('status') == 'hidden') return;
  $ele.data('status', 'hide').trigger('hide');
  // 继续执行的代码
  if (typeof callback === 'function') callback();
}
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
      css3._init($ele, 'slideUpDown');
    },
    show: function($ele) {
      css3._show($ele, 'slideUpDown');
    },
    hide: function($ele) {
      css3._hide($ele, 'slideUpDown');
    }
  },
  slideLeftRight: {
    init: function($ele) {
      $ele.width($ele.width()); //获取宽度包括隐藏)
      css3._init($ele, 'slideLeftRight');
    },
    show: function($ele) {
      css3._show($ele, 'slideLeftRight');
    },
    hide: function($ele) {
      css3._hide($ele, 'slideLeftRight');
    }
  },
  fadeslideUpDown: {
    init: function($ele) {
      $ele.height($ele.height()); //获取高度(包括隐藏)
      css3._init($ele, 'slideUpDown fadeOut');
    },
    show: function($ele) {
      css3._show($ele, 'slideUpDown fadeOut');
    },
    hide: function($ele) {
      css3._hide($ele, 'slideUpDown fadeOut');
    }
  },
  fadeslideLeftRight: {
    init: function($ele) {
      $ele.width($ele.width()); //获取宽度(包括隐藏)
      css3._init($ele, 'slideLeftRight fadeOut');
    },
    show: function($ele) {
      css3._show($ele, 'slideLeftRight fadeOut');
    },
    hide: function($ele) {
      css3._hide($ele, 'slideLeftRight fadeOut');
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
      js._show($ele, 'slideUpDown');
    },
    hide: function($ele) {
      js._show($ele, 'slideUp');
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
        visibility: 'hidden',
        height: 0,
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
        visibility: 'hidden',
        height: 0,
        'padding-left': 0,
        'padding-right': 0
      });
    }
  },
  fadeslideLeftRight: {
    init: function($ele) {
      js._customInit($ele, {
        opacity: 0,
        visibility: 'hidden',
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
        visibility: 'hidden',
        width: 0,
        'padding-left': 0,
        'padding-right': 0
      });
    }
  }
};
js._init = function($ele) {
  $ele.removeClass('transition');
  init($ele);
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

js._show = function($ele, action) {
  show($ele, function() {
    $ele.stop()[action](function() {
      $ele.data('status', 'shown').trigger('shown');
    });
  });
};
js._hide = function($ele, action) {
  show($ele, function() {
    $ele.stop()[action](function() {
      $ele.data('status', 'hidden').trigger('hidden');
    });
  });
};
js._customShow = function($ele) {
  show($ele, function() {
    $ele.stop().animate($ele.data('styles'), function() {
      $ele.data('status', 'shown').trigger('shown');
    });
  });
};
js._customHide = function($ele, options) {
  hide($ele, function() {
    $ele.stop().animate(options, function() {
      $ele.data('status', 'hidden').trigger('hidden');
    });
  });
};
