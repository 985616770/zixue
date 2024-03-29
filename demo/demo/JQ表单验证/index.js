var user = document.getElementById('user'),
  pwd = document.getElementById('pwd'),
  sigup = document.getElementById('sigup-btn'),
  login = document.getElementById('login-btn'),
  titles = document.getElementById('title').getElementsByTagName('span'),
  userInfo = document.getElementById('user_info'),
  userIcon = document.getElementById('user_icon'),
  pwdInfo = document.getElementById('pwd_info'),
  pwdIcon = document.getElementById('pwd_icon'),
  userReg = /^1[3578]\d{9}$/,
  pwdReg = /^\w{5,12}$/,
  isRepeat = false; // 记录用户名是否被占用
// 检测用户
function checkUser() {
  var userVal = user.value;
  // 验证手机号是否有效
  if (!userReg.test(userVal)) {
    userInfo.innerHTML = '手机号码无效！';
    userIcon.className = 'no';
  } else {
    userInfo.innerHTML = '';
    userIcon.className = '';
    // 发起请求
    $.ajax({
      url: 'http://localhost/register/server/isUserRepeat.php',
      data: { username: userVal },
      success: function(data) {
        if (data.code == 1) {
          userIcon.className = 'ok';
          isRepeat = false;
        } else if (data.code == 0) {
          userIcon.className = 'no';
          isRepeat = true;
          userInfo.innerHTML = data.msg;
        } else {
          userInfo.innerHTML = '检测失败，请重试...';
        }
      }
    });
  }
}

// 检测密码
function checkPwd() {
  var pwdVal = pwd.value;
  if (!pwdReg.test(pwdVal)) {
    pwdInfo.innerHTML = '请输入5到12位的字母、数字及下划线';
    pwdIcon.className = 'no';
  } else {
    pwdInfo.innerHTML = '';
    pwdIcon.className = 'ok';
  }
}

// 注册
function register() {
  var user_val = user.value,
    pwd_val = pwd.value;
  // 如果手机号有效且没有被占用，同时密码合法，方可注册
  if (userReg.test(user_val) && pwdReg.test(pwd_val) && !isRepeat) {
    // 发起请求，实现注册
    $.ajax({
      url: 'http://localhost/register/server/register.php',
      method: 'post',
      data: { username: user_val, userpwd: pwd_val },
      success: function(data) {
        alert('注册成功，请登录！');
        // 调用显示登录界面
        showLogin();
        // 清空文本框
        user.value = '';
        pwd.value = '';
      },
      error: function() {
        pwdInfo.innerHTML = '注册失败，请重试！';
      }
    });
  }
}

// 显示登录
function showLogin() {
  // 载入登录界面，登录高亮显示
  titles[0].className = 'current';
  titles[1].className = '';
  login.className = 'show';
  sigup.className = '';
}

// 显示注册
function showSigup() {
  // 载入注册界面，注册高亮显示
  titles[1].className = 'current';
  titles[0].className = '';
  login.className = '';
  sigup.className = 'show';
}

// 绑定事件，检测用户的有效性及是否注册过
user.addEventListener('blur', checkUser, false);

// 绑定事件，检测密码的有效性
pwd.addEventListener('blur', checkPwd, false);

// 注册
sigup.addEventListener('click', register, false);

// 登录高亮
titles[0].addEventListener('click', showLogin, false);

// 注册高亮
titles[1].addEventListener('click', showSigup, false);
