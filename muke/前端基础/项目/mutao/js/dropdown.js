// (function($) {
'use strict';
var slient = {
  init: function(ele) {},
  show: function(ele) {
    console.log($(ele));

    $(ele)
      .addClass('menu-active')
      .siblings()
      .removeClass('menu-active')
      .end()
      .find('.dropdown-layer')
      .css({
        display: 'block'
      });
  },
  hide: function(ele) {
    console.log('2');

    $(ele)
      .removeClass('menu-active')
      .siblings()
      .removeClass('menu-active')
      .end()
      .find('.dropdown-layer')
      .css({
        display: 'none'
      });
  }
};
var css3 = {};
var js = {};

// function Dropdown(elem, options){

// };
// Dropdown.DEFAULTS = {
//   css3:,
//   js:,
//   animation:
// }
// Dropdown.prototype.init = function () {

//  }
// })(jQuery);
var clone = function(obj) {
  var _f = function() {};
  //这句是原型式继承最核心的地方，函数的原型对象为对象字面量
  _f.prototype = obj;
  return new _f();
};
//先声明一个对象字面量
var Person = {
  name: 'Darren',
  getName: function() {
    return this.name;
  }
};
