$(document).ready(function() {
  var userExp = /^1\d{10}$/;
  var password = /^\w{4,10}$/;
  var textStatus = false;
  var passwordStatus = false;
  var status = false;
  $(':text').on('blur', function() {
    if (
      $(this)
        .val()
        .match(userExp)
    ) {
      $(this)
        .next()
        .addClass('ok')
        .removeClass('no')
        .next()
        .html('');
      textStatus = true;
    } else {
      $(this)
        .next()
        .removeClass('ok')
        .addClass('no')
        .next()
        .html('请输入正确的手机号码');
      textStatus = false;
    }
  });
  $(':password').on('blur', function() {
    if (
      $(this)
        .val()
        .match(password)
    ) {
      $(this)
        .next()
        .addClass('ok')
        .removeClass('no')
        .next()
        .html('');
      passwordStatus = true;
    } else {
      $(this)
        .next()
        .removeClass('ok')
        .addClass('no')
        .next()
        .html('请设置正确的密码格式');
      passwordStatus = false;
    }
  });
  $('#sigup-btn').on('click', function() {
    if (!status) {
      if (textStatus && passwordStatus) {
        alert('注册成功');
        $('p.title span:first-child')
          .addClass('current')
          .siblings()
          .removeClass('current');
        $(this).html($('p.title span:first-child').html());

        status = true;
        $(this).off('click', $(this));
      } else {
        alert('注册失败,请检查');
      }
    } else {
      console.log('1');
    }
  });

  $('p.title').on('click', function(event) {
    var $target = $(event.target);
    console.log($target);
    if ($target.hasClass('current')) {
      console.log('改不了');
    } else {
      status = false;
      $target.addClass('current').prev().removeClass('current')
      $('#sigup-btn').html('注 册');
    }
  });
});
