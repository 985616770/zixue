$(() => {
  // 手势切换

  // 自动轮播

  // 点随着移动

  // 玩成手势切换

  const $banner = $('.sn_banner');
  const width = $banner.width();

  const $imageBox = $banner.find('ul:first');
  const $pointBox = $banner.find('ul:last');

  const $points = $pointBox.find('li');
  // 轮播
  let index = 1;

  const animateFc = function() {
    $imageBox.animate(
      { transform: `translateX(${-index * width}px)` },
      200,
      () => {
        // 轮播
        if (index >= 9) {
          index = 1;
          // 瞬间
          $imageBox.css({ transform: `translateX(${-index * width}px)` });
        } else if (index <= 0) {
          index = 8;
          $imageBox.css({ transform: `translateX(${-index * width}px)` });
        }
        // 点
        $points
          .removeClass('now')
          .eq(index - 1)
          .addClass('now');
      }
    );
  };
  const timer = setInterval(() => {
    index++;
    animateFc();
  }, 3000);

  // 手势切换
  $banner.on('swipeLeft', () => {
    index++;
    animateFc();
  });

  $banner.on('swipeRight', () => {
    index--;
    animateFc();
  });
});
