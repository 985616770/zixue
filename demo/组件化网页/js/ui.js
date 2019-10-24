// ui-search
$.fn.UiSearch = function() {
  var ui = $(this); // 当前绑定的对象
  // 点击显示下拉框
  $('.ui-search-selected').on('click', function() {
    $('.ui-search-select-list').show();
    return false;
  });
  //  点击下拉框,将内容放在框中,并隐藏
  $('.ui-search-select-list a').on('click', function() {
    $('.ui-search-selected').text($(this).text());
    $('.ui-search-select-list').hide();
    return false;
  });
  // 点击其他地方,隐藏下拉快
  $('body').on('click', function() {
    $('.ui-search-select-list').hide();
  });
};

// ui-tab
/**
 * @param {string} header  TAB组件，的所有选项卡 item
 * @param {string} content TAB组件，内容区域，所有 item
 * @param {string} focus_prefix  选项卡高亮样式前缀，可选
 */
$.fn.UiTab = function(header, content, focus_prefix) {

  var ui = $(this);
  // 样式焦点前缀
  var focus_prefix = focus_prefix || '';
  // 上级tab
  var header = $(header, ui);
  // 下级tab
  var content = $(content, ui);
  header.on('click', function() {
    $(this)
      .addClass(focus_prefix + 'item_focus')
      .siblings()
      .removeClass(focus_prefix + 'item_focus');
    content
      .eq($(this).index())
      .show()
      .siblings()
      .hide();
  });
};

//  ui-top
$.fn.UiTop = function() {
  var $a = $('<a href="#1" class="ui-top">');
  $(this).append($a);
  var $height = $(window).height();

  $(window).on('scroll', function() {
    if ($(this).scrollTop() <= $height) {
      $a.hide();
    } else {
      $a.show();
    }
  });

  $('.ui-top').on('click', function() {
    $(window).scrollTop(0);
  });
};

// ui-slider
$.fn.UiSlider = function() {
  var ui = $(this);
  // 容器的宽度
  var banner = $('.ui-slider-content');
  var oneWidth = $('.ui-slider-content img')
    .eq(0)
    .width();
  var len = $('.ui-slider-content img').length;
  var index = 0;
  // 边界的判断
  function slider() {
    if (index < 0) {
      index = len - 1;
    } else if (index > len - 1) {
      index = 0;
    }
    banner.css('left', -(index * oneWidth) + 'px');
    $('.ui-slider-pots span')
      .eq(index)
      .addClass('ui-slider_focus')
      .siblings()
      .removeClass('ui-slider_focus');
  }
  var autoScroll = setInterval(function() {
    index++;
    slider();
  }, 3000);
  $(this)
    .on('mouseover', function() {
      clearInterval(autoScroll);
    })
    .on('mouseout', function() {
      autoScroll = setInterval(function() {
        index++;
        slider();
      }, 3000);
    });
  $('.ui-slider-arrow-left', ui).on('click', function() {
    index--;
    slider();
  });

  $('.ui-slider-arrow-right', ui).on('click', function() {
    index++;
    slider();
  });

  $('.ui-slider-pots span', ui).on('click', function() {
    index = $(this).index();
    slider();
  });
};

// ui-cascading 多级联动下拉框
$.fn.UiCascading = function() {
  var ui = $(this);
  var selects = $('select', ui);
  selects
    .on('change', function() {
      var val = $(this).val();
      var index = selects.index(this);
      // 触发下一个select的更新,根据当前位置
      var where = $(this).attr('data-where');
      where = where ? where.split(',') : [];
      where.push(val);
      // 更新下一个的where属性,并清空后面所有的的数据
      selects
        .eq(index + 1)
        .attr('data-where', where.join(','))
        .triggerHandler('reloadOptions');

      ui.slice(index + 1).each(function() {
        $(this)
          .attr('data-where', '')
          .triggerHandler('reloadOptions');
      });
    })
    .on('reloadOptions', function() {
      var method = $(this).attr('data-search');
      var args = $(this)
        .attr('data-where')
        .split(',');
      var data = AjaxRemoteGetData[method].apply(this, args);
      var select = $(this);
      select.find('option').remove();
      $.each(data, function(i, item) {
        var el = $('<option value="' + item + '">' + item + '</option>');
        select.append(el);
      });
    });
  console.log(selects.eq(0));
  selects.eq(0).triggerHandler('reloadOptions');
};
$(document).ready(function() {
  $('.ui-search-selected').UiSearch();
  $('.ui-tap').UiTab('.ui-tap-caption > .item', '.ui-tap-content > .item');
  $('.ui-tap').UiTab(
    '.ui-block-caption > a',
    '.ui-block-content > .block-content',
    'block-caption-'
  );
  $('body').UiTop();
  $('.ui-slider').UiSlider();
  $('.ui-cascading').UiCascading();
});
