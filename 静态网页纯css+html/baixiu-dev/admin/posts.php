<?php
require_once '../functions.php';

//=============  筛 选 =====
$categories = xiu_fetch_all('select * from categories;');
$where = '1 = 1';
$search = '';
if (isset($_GET['category']) && $_GET['category'] !== 'all') {
  $where .= ' and posts.category_id = '.$_GET['category'];
  $search .= '&category='.$_GET['category'];
}
if (isset($_GET['status']) && $_GET['status'] !== 'all') {
  $where .= " and posts.status = '{$_GET['status'] }'";
  $search .= '&status='.$_GET['status'];
}
//===========================









//处理分页参数
$page = empty($_GET['page']) ? 1 : (int)$_GET['page'];
$size =20;
//计算出越过多少条
$offset = ($page - 1) * $size;
//获取全部数据(联合查询)
$posts = xiu_fetch_all("
SELECT 
	posts.id,
	posts.title,
	users.nickname as user_name,
	categories.name as category_name,
	posts.created,
	posts.status	
FROM posts
INNER JOIN categories on posts.category_id = categories.id
INNER JOIN users on posts.user_id = users.id
where {$where}
order by posts.created DESC
LIMIT {$offset}, {$size};");

$total_count = xiu_fetch_one("select 
count(1) as count	
from posts
inner join categories on posts.category_id = categories.id
inner join users on posts.user_id = users.id
where {$where}")['count'];

$total_pages = (int)ceil($total_count/$size);
if ($page < 1) {
  header('Location:/admin/posts.php?page=1'.$search);
}
if ($page > $total_pages) {
  header("Location:/admin/posts.php?page={$total_pages}".$search);
}
//分页页码
//计算页码开始
$visiables = 5;
$begin = $page - ($visiables - 1)/2;
$end  = $begin + $visiables - 1;

//判断最大值和最小值

$begin = $begin < 1? 1:$begin; //判断最小值
$end  = $begin + $visiables -1;
$end = $end >$total_pages ? $total_pages :$end;
$begin = $end - $visiables + 1;
$begin = $begin < 1 ? 1: $begin;

/**
 * 转换状态显示
 * @param [type] $status [description]
 * @return string
 */
function convert_status($status)
{
    $dict = array(
    'published' => '已发布',
    'drafted' => '草稿',
    'trashed' => '回收站'
  );
    return isset($dict[$status]) ? $dict[$status] : '未知';
}

/**
 * 时间转换
 * @param
 */
function convert_date($created)
{
    $timestamp = strtotime($created);
    return date('Y年m月d日<b\r> H:i:s', $timestamp);
}

?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Posts &laquo; Admin</title>
  <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/static/assets/vendors/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="/static/assets/vendors/nprogress/nprogress.css">
  <link rel="stylesheet" href="/static/assets/css/admin.css">
  <script src="/static/assets/vendors/nprogress/nprogress.js"></script>
</head>
<body>
  <script>NProgress.start()</script>

  <div class="main">
  <?php include 'inc/navbar.php' ?>
    <div class="container-fluid">
      <div class="page-title">
        <h1>所有文章</h1>
        <a href="post-add.php" class="btn btn-primary btn-xs">写文章</a>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="page-action">
        <!-- show when multiple checked -->
        <a class="btn btn-danger btn-sm" href="javascript:;" style="display: none">批量删除</a>
        <form class="form-inline" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="get">
          <select name="category" class="form-control input-sm">
            <option value="all">所有分类</option>
            <?php foreach ($categories as $item): ?> 
            <option value="<?php echo $item['id']; ?>" <?php echo isset($_GET['category']) && $_GET['category'] === $item['id'] ? 'selected':'' ?> >
            <?php echo $item['name']; ?>
            </option>
            <?php endforeach ?>
          </select>
          <select name="status" class="form-control input-sm">
            <option value="all">所有状态</option>
            <option value="drafted"<?php echo isset($_GET['status']) && $_GET['status'] === 'drafted' ? 'selected':'' ?>>草稿</option>
            <option value="published"<?php echo isset($_GET['status']) && $_GET['status'] === 'published' ? 'selected':'' ?>>已发布</option>
            <option value="trashed"<?php echo isset($_GET['status']) && $_GET['status'] === 'trashed' ? 'selected':'' ?>>垃圾桶</option>
          </select>
          <button class="btn btn-default btn-sm" type="submit">筛选</button>
        </form>
        <ul class="pagination pagination-sm pull-right">
          <li><a href="?page=<?php echo ($page-1).$search;?>">上一页</a></li>
          
          <?php for ($i = $begin; $i <= $end; $i++): ?>
          <li <?php echo $i === $page ? 'class="active"':''; ?>>
          <a href="?page=<?php echo $i.$search;?>"><?php echo $i; ?></a>
          </li>
          <?php endfor ?>
          <li><a href="?page=<?php echo ( $page + 1 ).$search;?>">下一页</a></li>
        </ul>
      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th>标题</th>
            <th>作者</th>
            <th>分类</th>
            <th class="text-center">发表时间</th>
            <th class="text-center">状态</th>
            <th class="text-center" width="100">操作</th>
          </tr>
        </thead>
        <tbody>
        <?php foreach ($posts as $item): ?>
          <tr>
            <td class="text-center"><input type="checkbox"></td>
            <td> <?php echo $item['title']; ?></td>
            <td><?php echo  $item['user_name']; ?></td>
            <td><?php echo $item['category_name']; ?></td>
            <td class="text-center"><?php echo  convert_date($item['created']); ?></td>
            <!-- 转换过于复杂,不建议直接写在混编地址 -->
            <td class="text-center"><?php echo  convert_status($item['status']); ?></td>
            <td class="text-center">
              <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>
        <?php endforeach ?>
        </tbody>
      </table>
    </div>
  </div>

 <?php $current_page = 'posts'; ?>
  <?php include 'inc/sidebar.php' ?>

  <script src="/static/assets/vendors/jquery/jquery.js"></script>
  <script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script>NProgress.done()</script>
  <script> 
  s
  </script>
</body>
</html>
