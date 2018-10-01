<?php 
if (empty($_GET['id'])) {
    exit('<h1>必须闯入</h1>');
}

$id = $_GET['id'];

$conn = mysqli_connect('localhost', 'root', '123456', 'demo');

$query = mysqli_query($conn, 'delete from users where id = ' . $id . ';');

$affected_rows = mysqli_affected_rows($conn);

if ($affected_rows <= 0) {
    exit('<h1>hhhh</h1>');
}
header('Location: list2.php');