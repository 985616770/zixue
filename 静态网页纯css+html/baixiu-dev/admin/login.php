<?php
//载入配置
session_start();
require_once '../config.php';
function login()
{
    // 1.接受并校验

    // 2.持久化

    // 3.响应
    if (empty($_POST['email'])) {
        $GLOBALS['message'] = '请填写邮箱';
        return;
    }

    if (empty($_POST['password'])) {
        $GLOBALS['message'] = '请填写密码';
        return;
    }
    $email = $_POST['email'];
    $password = $_POST['password'];

    //连接数据库
    $conn = mysqli_connect(XIU_DB_HOST, XIU_DB_USER, XIU_DB_PASS, XIU_DB_NAME);
    if (!$conn) {
        exit('<h1>连接数据库失败</h1>');
    }
    $query = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}' limit 1;");

    if (!$query) {
        $GLOBALS['message'] = '登入失败,请重试';
        return;
    }
    $user = mysqli_fetch_assoc($query);
    if (!$user) {
        $GLOBALS['message'] = '邮箱与密码不匹配';
        return;
    }
    if ($user['password'] !== $password) {
        $GLOBALS['message'] = '邮箱与密码不匹配';
        return;
    }
    //为了后续可以直接获取当前的登陆用户的信息,这里直接将用户信息放到session中
    $_SESSION['current_login_user'] = $user;

    header('Location:/admin/');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    login();
}

?>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="utf-8">
  <title>Sign in &laquo; Admin</title>
  <link rel="stylesheet" href="../static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/static/assets/vendors/animate/animate.min.css">
  <link rel="stylesheet" href="../static/assets/css/admin.css">
</head>

<body>
<div class="login">
  <form class="login-wrap<?php echo isset($message) ? ' shake animated' : '' ?>" action ="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" novalidate autocomplete="off">
    <img class="avatar" src="../static/assets/img/default.png">
    <?php if (isset($message)): ?>
    <div class="alert alert-danger">
      <strong>错误！</strong>
      <?php echo $message; ?>
    </div>
    <?php endif;?>
    <div class="form-group">
      <label for="email" class="sr-only">邮箱</label>
      <input id="email" name="email" type="email" class="form-control" value="<?php echo empty($_POST['email']) ? '' : $_POST['email'] ?>" placeholder="邮箱" autofocus>
    </div>
    <div class="form-group">
      <label for="password" class="sr-only">密码</label>
      <input id="password" name="password" type="password" class="form-control" placeholder="密码">
    </div>
    <button class="btn btn-primary btn-block" type="submit">登 录</button>
  </form>
  </div>
  <script src="../static/assets/vendors/jquery/jquery.min.js"></script>
  <script>
  $(function ($) {
      // 目标:用户输入自己的邮箱后,页面显示对应的头像
    //   实现:
    // 时机:邮箱文本框失去焦点.并且能拿到文本框填写的邮箱时
    var emailFormat  = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/
    $('#email').on('blur',function () {
        var value = $(this).val()
        //忽略掉文本框为空,或者不是邮箱
        if(!value || !emailFormat.test(value)) return


        //获取邮箱对应的头像地址,通过发送  AJAX  请求 ,通过接口获取头像地址
        $.get('/admin/api/avatar.php',{email:value},function (res) {
            // res获取头像的地址
            if (!res) return
            $('.avatar').fadeOut(function () {
                 $(this).on('load',function () {
                    $(this).fadeIn()
                  }).attr('src',res) }
            )
        })


    })
  })
  </script>
  </body>

</html>