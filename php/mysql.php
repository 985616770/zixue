<?php
$connection = mysqli_connect('localhost:3306', 'root', '123456', 'demo');

if (!$connection) {
    exit('连接数据库失败');
}

$query = mysqli_query($connection,'select * from users;');
$row = mysqli_fetch_assoc($query);
while ($row = mysqli_fetch_assoc($query)) {
    var_dump($row);
}