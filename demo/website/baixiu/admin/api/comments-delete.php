<?php

//接受客户端的ajax请求,返回评论数据

require_once '../../functions.php';
if(empty($_GET['id'])){
    exit('缺少必要参数');
}
$id = $_GET['id'];

$rows = xiu_execute('delete from comments where id in ('.$id.');');
header('Content-Type:application/json');

echo json_encode($rows > 0);