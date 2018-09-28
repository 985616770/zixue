<?php 

//接受客户端的ajax请求,返回评论数据

require_once '../../functions.php';

//所有数据
$comments = xiu_fetch_all('SELECT * FROM comments;');

//因为网络之间传输的只能是字符串 
// 数据转换成字符串(序列化)
$json =json_encode($comments);

header('Content-Type:application/json');

echo $json;

