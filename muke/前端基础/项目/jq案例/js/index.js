// 轮播组件

$(document).ready(function() {
  var index = 0;
  var warp = $('.container');
  var alinks = warp.find('#nav a');
  var imgs = warp.find('.img img');
  console.log(alinks);
  console.log(imgs);
  function swiper() {
    imgs
      .eq(index)
      .stop()
      .fadeIn(1000)
      .siblings()
      .stop()
      .fadeOut(1000);
  }
  function mouseenter(event) {
    clearInterval(time);
    event.stopPropagation();
    console.log('1');
    index = $(this).index();
    swiper();
  }
  function mouseout(event) {
    clearInterval(time);
    time = setInterval(function() {
      event.stopPropagation();
      if (index == 0) {
        index = index < alinks.length ? ++index : alinks.length - 1;
      } else if (index == alinks.length - 1) {
        index = 0;
      } else {
        index++;
      }
      console.log(index);
      swiper();
    }, 2000);
  }
  function keydown(event) {
    clearInterval(time);
    event.stopPropagation();
    if (event.keyCode == 39) {
      index = index < alinks.length ? ++index : alinks.length - 1;
    } else if (event.keyCode == 37) {
      index = index > 0 ? --index : 0;
    }
    swiper();
  }
  var events = {
    mouseenter: mouseenter,
    keydown: keydown,
    mouseout: mouseout
  };
  alinks.add(document).on(events);

  var time = setInterval(function() {
    if (index == 0) {
      index = index < alinks.length ? ++index : alinks.length - 1;
    } else if (index == alinks.length - 1) {
      index = 0;
    } else {
      index++;
    }
    console.log(index);
    swiper();
  }, 2000);
});

// js

// window.onload = function() {
//   var imgAll = document.querySelectorAll('img');
//   var navAll = document.querySelector('nav');
//   var pointer = 0;

//   navAll.addEventListener('click', listClickFun);
//   function listClickFun(event) {
//     var clickObj = event.target ? event.target : event.srcElement;
//     var parentObj = clickObj.parentNode
//       ? clickObj.parentNode
//       : clickObj.parentElement;
//     for (var i = 0; i < parentObj.children.length; i++) {
//       if (parentObj.children[i] == clickObj) {
//         pointer = i;
//       }
//     }

//     for (var i = 0; i < imgAll.length; i++) {
//       imgAll[i].style.opacity = '0';
//       if (i == pointer) {
//         imgAll[i].style.opacity = '1';
//       }
//     }
//     pointer = 0;
//   }
// };
