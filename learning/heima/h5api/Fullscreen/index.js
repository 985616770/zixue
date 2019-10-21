$(() => {
  const $video = $('video');
  const video = $video.get(0);
  const $total = $('.total');

  const $switch = $('.switch');

  const $line = $('.line');

  const $current = $('.current');

  const $expand = $('.expand');

  const $bar = $('.bar');

  const formatTime = function (time) {
    // 01:02:20 格式
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor(time % 60);
    return `${h >= 10 ? h : `0${h}`}:${m >= 10 ? m : `0${m}`}:${s >= 10 ? s : `0${s}`}`;
  };

  // 1.加载效果 总时长显示
  video.oncanplay = function () {
    $video.show();
    $total.html(formatTime(video.duration));
  };
  // 2.播放功能 暂停功能
  $switch.on('click', () => {
    if ($switch.hasClass('fa-play')) {
      // 播放
      video.play();
      $switch.removeClass('fa-play').addClass('fa-pause');
    } else {
      // 暂停
      video.pause();
      $switch.addClass('fa-play').removeClass('fa-pause');
    }
  });
  // 3.播放中进度条显示
  video.ontimeupdate = function () {
    // 当前播放时间
    $current.html(formatTime(video.currentTime));
    // 进度条显示 长度来显示 百分比
    const ratio = video.currentTime / video.duration;
    const p = `${ratio * 100}%`;
    $line.css('width', p);
  };
  // 4.全屏/取消全屏
  $expand.on('click', () => {
    if ($expand.hasClass('fa-arrows-alt')) {
      // 全屏操作
      video.webkitRequestFullScreen();
      // 改按钮
      $expand.removeClass('fa-arrows-alt').addClass('fa-compress');
    } else {
      document.webkitCancelFullScreen();
      $expand.addClass('fa-arrows-alt').removeClass('fa-compress');
    }
  });
  // 5.跃进功能
  $bar.on('click', (e) => {
    // 获取点击的位置和进度条的位置,来计算播放的进度
    const width = $bar.width();
    // offsetX|Y 相对于当前的元素的位置
    const location = e.offsetX;
    // 计算播放时间
    const time = location / width * video.duration;
    // 设置
    video.currentTime = time;
    // 视频加载完才能看到效果
    // 没有效果 以本地file打开试试
  });
  // 6.播放完毕重置功能
  video.onended = function () {
    video.currentTime = 0;
    $switch.addClass('fa-play').removeClass('fa-pause');
  };
});
