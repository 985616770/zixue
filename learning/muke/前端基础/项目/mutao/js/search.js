(function() {
  'use strict';
  // 数据缓存到本地
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
    deleteDataByKey: function(key) {
      delete this.data[key];
      this.count--;
    },
    deleteDataByOrder: function(num) {
      var count = 0;

      for (const p in this.data) {
        if (count >= num) {
          break;
        }
        count++;
        this.deleteDataByKey(p);
      }
    }
  };

  function Search($elem, options) {
    this.$elem = $elem;
    this.options = options;

    this.$form = this.$elem.find('.search-form');
    this.$input = this.$elem.find('.search-inputBox');
    this.$layer = this.$elem.find('.search-layer');
    this.loaded = false;
    // 事件代理
    this.$elem.on('click', '.search-btn', $.proxy(this.submit, this));
    if (this.options.autocomplete) {
      this.autocomplete();
    }
  }

  Search.DEFAULTS = {
    autocomplete: false,
    url:
      'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1570928454867_1910&callback=jsonp1911&k=1&area=c2c&bucketid=19&q=',
    css3: false,
    js: false,
    animation: 'fade',
    // 添加间隙时间,来提升性能,防止多次触发事件
    getDataInterval: 200
  };

  Search.prototype.submit = function() {
    // 空值无反应
    if (this.getInputVal() === '') {
      return false;
    }
    // 表单提交
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
    console.log(inputVal);

    // 没获得数据 触发事件
    if (inputVal == '') return self.$elem.trigger('search-noData');

    // 从缓存中获取数据
    if (cache.readData(inputVal)) {
      return self.$elem.trigger('search-getData', [cache.readData(inputVal)]);
    }
    // 防止上次的请求未结束,继续请求
    if (this.jqXHR) {
      this.jqXHR.abort();
    }
    this.jqXHR = $.ajax({
      url: this.options.url + inputVal,
      dataType: 'jsonp'
    })
      .done(function(data) {
        cache.addData(data);
        console.log(data);
        
        self.$elem.trigger('search-getData', [data]);
      })
      .fail(function() {
        self.$elem.trigger('search-noData');
      })
      .always(function() {
        // 请求结束后 始终清除对象
        self.jqXHR = null;
      });
  };
  // 显示下拉层
  Search.prototype.showLayer = function() {
    if (!this.loaded) {
      return;
    }
    this.$layer.showHide('show');
  };
  // 隐藏下拉层
  Search.prototype.hideLayer = function() {
    this.$layer.showHide('hide');
  };

  Search.prototype.getInputVal = function() {
    return $.trim(this.$input.val());
  };
  // 返回的数据含有html标签
  Search.prototype.setInputVal = function(val) {
    this.$input.val(removeHtmlTags(val));

    function removeHtmlTags(str) {
      return str.replace(/<(?:[^>'"]|"[^']*"|'[^"]*')*>/g, '');
    }
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
            typeof option === 'object' && option
          );

        if (!search) {
          $this.data('search', (search = new Search($this, options)));
        }
        if (typeof search[option] === 'function') {
          search[option](value);
        }
      });
    }
  });
})();
