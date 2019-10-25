<?php
require_once '../functions.php';
//判断用户
xiu_get_current_user();

//封装数据库连接

$posts_count = xiu_fetch_one('SELECT count(1) as num FROM posts;')['num'];
$categories_count = xiu_fetch_one('SELECT count(1) as num FROM categories;')['num'];
$comments_count = xiu_fetch_one('SELECT count(1) as num FROM comments;')['num'];
$comments_drafted = xiu_fetch_one("SELECT count(1) as num FROM posts WHERE status = 'drafted';")['num'];
$comments_held = xiu_fetch_one("SELECT count(1) as num FROM comments WHERE status = 'held';")['num'];

?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Dashboard &laquo; Admin</title>
  <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/static/assets/vendors/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="/static/assets/vendors/nprogress/nprogress.css">
  <link rel="stylesheet" href="/static/assets/css/admin.css">
  <script src="/static/assets/vendors/nprogress/nprogress.js"></script>
</head>
<body>
  <script>NProgress.start()</script>

  <div class="main">
  <?php include 'inc/navbar.php'?>
    <div class="container-fluid">
      <div class="jumbotron text-center">
        <h1>One Belt, One Road</h1>
        <p>Thoughts, stories and ideas.</p>
        <p><a class="btn btn-primary btn-lg" href="post-add.html" role="button">写文章</a></p>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">站点内容统计：</h3>
            </div>
            <ul class="list-group">
              <li class="list-group-item"><strong><?php echo $posts_count ?></strong>篇文章（<strong><?php echo $comments_drafted ?></strong>篇草稿）</li>
              <li class="list-group-item"><strong><?php echo $categories_count ?></strong>个分类</li>
              <li class="list-group-item"><strong><?php echo $comments_count ?></strong>条评论（<strong><?php echo $comments_held ?></strong>条待审核）</li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
        <canvas id="myChart"></canvas>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>

  <?php $current_page = 'index';?>
  <?php include 'inc/sidebar.php'?>

  <script src="/static/assets/vendors/jquery/jquery.js"></script>
  <script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script src="/static/assets/vendors/chart/Chart.js"></script>
  <script>NProgress.done()</script>
  <script>
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["文章", "分类", "评论",],
        datasets: [{
            label: '# of Votes',
            data: [<?php echo $posts_count ?>,<?php echo $categories_count ?>,<?php echo $comments_count ?>],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
  
});
  </script>
</body>
</html>
