'use strict';
function Slider(ele) {
  this.elem = ele;
  this.banner = document.getElementById('banner');
  this.left = document.getElementById('prev');
  this.right = document.getElementById('next');
  this.indicator = document.getElementById('dots');
  this.indicators = document.getElementById('dots').children;
  this.items = this.elem.children[0].children;
  this.item = this.elem.children[0];
  this.firstItem = this.elem.children[0].children[0];

  this.currentIndex = 0;
  this.itemWidth = parseFloat(
    getComputedStyle(this.elem.children[0].children[0]).getPropertyValue(
      'width'
    )
  );

  this.init();
}

Slider.prototype.init = function() {
  var index = this.currentIndex;
  var self = this;
  this.item.appendChild(self.firstItem.cloneNode(true));
  this.left.onclick = function() {
    index--;
    if (index < 0) {
      self.banner.classList.remove('transition');
      index = self.indicators.length - 1;
      setTimeout(function() {
        self.banner.classList.add('transition');
        self.move(index);
      }, 20);
    }
    index = self.getCorrectIndex(index);
    console.log(index);
    self.move(index);
    self.activeIndicator(index);
    console.log((this.banner = document.getElementById('banner').style.Left));
  };
  this.right.onclick = function() {
    index++;
    if (index > self.indicators.length - 1) {
      self.banner.classList.remove('transition');
      index = 0;
      setTimeout(function() {
        self.banner.classList.add('transition');
        self.move(index);
      }, 20);
    }
    index = self.getCorrectIndex(index);
    console.log(index);
    self.move(index);
    self.activeIndicator(index);
  };
  this.indicator.addEventListener('click', function(e) {
    if (!e.target) {
      return;
    }
    e.stopPropagation();
    console.log(e.target);

    for (let i = 0; i < self.indicators.length; i++) {
      self.indicators[i].classList.remove('active');
      if (self.indicators[i] == e.target) {
        self.indicators[i].classList.add('active');
        self.move(i);
      }
    }
  });
};
Slider.prototype.getCorrectIndex = function(index, maxNum) {
  maxNum = maxNum || this.items.length;
  if (isNaN(Number(index))) return 0;
  if (index < 0) {
    return maxNum - 1;
  }
  if (index > maxNum - 1) {
    return 0;
  }
  return index;
};
Slider.prototype.activeIndicator = function(index) {
  for (let i = 0; i < this.indicators.length; i++) {
    this.indicators[i].classList.remove('active');
    if (index == i) {
      this.indicators[i].classList.add('active');
    }
  }
};
Slider.prototype.move = function(index) {
  this.banner.style.left = -index * this.itemWidth + 'px';
  // debugger;
};


var b = document.getElementById('slider');
var a = new Slider(b);
