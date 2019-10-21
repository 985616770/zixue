<?php 

if (empty($_FILES['avatar'])) {
    exit('必须上传文件');    
}

$avatar = $_FILES['avatar'];

if ($avatar['error'] !== UPLOAD_ERR_OK) {
    exit('上传失败');
}

//校验类型到网站范围之类
$ext = pathinfo($avatar['name'],PATHINFO_EXTENSION);
$target = '../../static/uploads/img-'.uniqid().'.'.$ext;
if (!move_uploaded_file($avatar['tmp_name'], $target)) {
    exit('上传失败2');
}

echo substr($target, 5);
