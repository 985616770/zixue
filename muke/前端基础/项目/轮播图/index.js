// 轮播效果
var banner = document.getElementById('banner');
var w = banner.offsetWidth;
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var dots = document.getElementById('dots');
console.log(banner.style.left);
var state = true;
// setInterval(lunBo, 2000);

function lunBo() {
  var left = banner.style.left;
  var l = left.replace('px', '');

  console.log(state);
  if (state) {
    if (l == -w + 1400) {
      state = false;
    } else {
      l -= 1400;
      console.log(banner.style.left);
      banner.style.left = `${l}px`;
    }
  } else if (state == false) {
    l = parseInt(l);
    console.log(banner.style.left);
    if (l == -1400) {
      l = parseInt(l) + 1400;
      state = 1;
      banner.style.left = `${l}px`;
    } else {
      l += 1400;
      banner.style.left = `${l}px`;
    }
  }
}

prev.addEventListener('click', function() {
  banner.style.left = `${0}px`;
});
next.addEventListener('click', function() {
  banner.style.left = `${-2800}px`;
});
// lunBo();
