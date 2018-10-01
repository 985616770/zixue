<?php

//接受客户端的ajax请求,返回评论数据

require_once '../../functions.php';

//所有数据
$page = empty($_GET['page']) ? 1 : intval($_GET['page']);
$length= 10;
$offset = ($page - 1) * $length;
$sql = sprintf('select
comments.*,
posts.title as post_title
from comments
inner join posts on comments.post_id = posts.id 
order by comments.created asc
limit %d, %d;', $offset, $length);
$comments =xiu_fetch_all($sql);
//查询出所有的评论数,
$total_count = xiu_fetch_one('select
count(1) as count
from comments
inner join posts on comments.post_id = posts.id ')['count'];
$total_pages = ceil($total_count/$length);
//返回的数据类型是float类型

//因为网络之间传输的只能是字符串
// 数据转换成字符串(序列化)
$json =json_encode(array(
    'comments'=>$comments,
    'total_pages'=>$total_pages
));

header('Content-Type:application/json');

echo $json;
