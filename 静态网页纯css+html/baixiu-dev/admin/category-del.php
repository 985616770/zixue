<?php 
require_once '../functions.php';
/**
 * 根据客户端传递过来的ID删除对应数据
 * 
 */

 if(empty($_GET['id'])){
     exit('缺少必要数据');
 }

 $id = $_GET['id'];

 $rows = xiu_execute('DELETE FROM categories WHERE id='.$id);

 if ($rows > 0) {
    
 }

//sql 注入 
 header('Location: /admin/categories.php');