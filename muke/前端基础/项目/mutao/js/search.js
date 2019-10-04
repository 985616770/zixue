(function($) {
  'use strict';
  // 数据缓存,防止重复访问
  var cache = {
    data: {},
    count: 0,
    addData: function(key, data) {
      if (!this.data[key]) {
        this.data[key] = data;
        this.count++;
      }
    },
    readData: function(key) {
      return this.data[key];
    },
    deleteDataKey: function(key) {
      if (!data[key]) return;

      delete this.data[key];
      this.count--;
    },
    deleteDataByOrder: function(num) {
      var count = 0;
      for (let key in this.data) {
        if (count >= num) {
          break;
        }
        count++;
        this.deleteDataKey(key);
      }
    }
  };

  function Search($ele, options) {
    this.$ele = $ele;
    this.options = options;

    this.$input = this.$ele.find('.search-inputBox');
    this.$form = this.$ele.find('.search-form');
    this.$layer = this.$ele.find('.search-layer');
    this.loaded = false;
    this.$ele.on('click', '.search-btn', $.proxy(this.submit, this));
    if (this.options.autocomplete) {
      this.autocomplete();
    }
  }
  Search.DEFAULTS = {
    autocomplete: false,
    url:
      'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1570174448055_2012&callback=jsonp2013&k=1&area=c2c&bucketid=17&q=',
    css3: false,
    js: false,
    animation: 'fade',
    getDataInterval: 0
  };
  Search.prototype.submit = function() {
    if (this.getInputVal() === '') {
      return false;
    }
    this.$form.submit();
  };
  Search.prototype.autocomplete = function() {
    var timer = null,
      self = this;
    this.$input
      .on('input', function() {
        if (self.options.getDataInterval) {
          clearTimeout(timer);
          timer = setTimeout(function() {
            self.getData();
          }, self.options.getDataInterval);
        } else {
          self.getData();
        }
      })
      .on('focus', $.proxy(this.showLayer, this))
      .on('click', function() {
        return false;
      });
    this.$layer.showHide(this.options);

    $(document).on('click', $.proxy(this.hideLayer, this));
  };
  Search.prototype.getData = function() {
    var self = this;
    var inputVal = this.getInputVal();
    if (inputVal == '') return self.$ele.trigger('search-noData');
    if (cache.readData(inputVal))
      return self.$ele.trigger('search-getData', [cache.readData(inputVal)]);

    // 结束上次的jsonp 查询
    // if (this.jqXHR) this.jqXHR.abort();
    console.log(this.options.url + inputVal);
    // this.jqXHR =
    $.ajax({
      url: this.options.url + inputVal,
      dataType: 'jsonp'
    })
      .done(function(data) {
        cache.addData(inputVal, data);
        console.log(cache.data);

        self.$ele.trigger('search-getData', [data]);
      })
      .fail(function(data) {
        self.$ele.trigger('search-noData');
      })
      .always(function() {
        self.jqXHR = null;
      });
  };
  Search.prototype.showLayer = function() {
    if (!this.loaded) return;
    // if (this.$layer.children().length === 0) return;
    this.$layer.showHide('show');
  };
  Search.prototype.hideLayer = function() {
    this.$layer.showHide('hide');
  };
  Search.prototype.getInputVal = function() {
    return $.trim(this.$input.val());
  };
  Search.prototype.setInputVal = function(val) {
    this.$input.val(removeHtmlTags(val));

    function removeHtmlTags(str) {
      return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, '');
    }
  };
  Search.prototype.upDown = function() {
    $(this).on('keydown', function(e) {
      console.log('e');
    });

    // var items = $('.search-layer-item', this.$layer);
    // var index = 0;
    // items
    //   .eq(index)
    //   .addClass('search-layer-item_focus')
    //   .siblings()
    //   .removeClass('search-layer-item_focus');
    // if (this.e.keycode == 40) {
    //   items
    //     .eq(++index)
    //     .addClass('search-layer-item_focus')
    //     .siblings()
    //     .removeClass('search-layer-item_focus');
    // } else if (this.e.keycode == 38) {
    //   items
    //     .eq(--index)
    //     .addClass('search-layer-item_focus')
    //     .siblings()
    //     .removeClass('search-layer-item_focus');
    // }
  };
  Search.prototype.appendLayer = function(html) {
    this.$layer.html(html);
    this.loaded = !!html;
  };
  $.fn.extend({
    search: function(option, value) {
      return this.each(function() {
        var $this = $(this),
          search = $this.data('search'),
          options = $.extend(
            {},
            Search.DEFAULTS,
            $this.data('search'),
            typeof option === 'object' && option
          );
        // console.log(options);

        if (!search) {
          $this.data('search', (search = new Search($this, options)));
        }
        if (typeof search[option] === 'function') {
          search[option](value);
        }
      });
    }
  });
})(jQuery);

// (function($) {
//   'use strict';

//   var $search = $('.search'),
//     $input = $search.find('.search-inputBox'),
//     $btn = $search.find('.search-bth'),
//     $form = $search.find('.search-form'),
//     $layer = $search.find('.search-layer');
//   console.log($input);

//   // 验证
//   $form.on('submit', function() {
//     if ($.trim($input.val()) === '') {
//       return false;
//     }
//   });
//   //自动完成
//   $input.on('input', function() {
//     var url =
//       'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1570174448055_2012&callback=jsonp2013&k=1&area=c2c&bucketid=17&q=' +
//       encodeURIComponent($.trim($input.val()));
//     $.ajax({
//       url: url,
//       dataType: 'jsonp'
//     })
//       .done(function(data) {
//         var maxNum = 10;
//         var html = '';

//         if (data['result'].length == 0) {
//           $layer.hide().html('');
//         }

//         for (let i = 0; i < data['result'].length; i++) {
//           if (i > maxNum) break;
//           const ele = data['result'][i];
//           html +=
//             '<li class="search-layer-item text-ellipsis">' + ele[0] + '</li>';
//         }
//         console.log(html);

//         $layer.html(html).show();
//       })
//       .fail(function() {
//         $layer.hide().html('');
//       })
//       .always(function() {
//         console.log('调不动我了吧');
//       });
//   });
//   // 事件代理
//   $layer.on('click', '.search-layer-item', function() {
//     $input.val(removeHtmlTags($(this).html()));
//     $form.submit();
//   });

//   // 替换html 标签
//   function removeHtmlTags(str) {
//     return str.replace(/<(?:[^>"']|"[^"]*"|'[^']*')*>/g, '');
//   }
//   // 点击空白隐藏,显示
//   $input
//     .on('focus', function() {
//       $layer.show();
//     })
//     .click(function() {
//       return false;
//     });
//   $(document).click(function() {
//     $layer.hide();
//   });
// })(jQuery);
