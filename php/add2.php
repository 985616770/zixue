<?php 
function add_user()
{

    if (empty($_POST['name'])) {
        $GLOBALS['error_message'] = '请输入姓名';
        return;
    }
    if (!isset($_POST['gender'])) {
        $GLOBALS['error_message'] = '请输入姓名';
        return;
    }
    if (empty($_POST['name'])) {
        $GLOBALS['error_message'] = '请输入姓名';
        return;
    }
}

if ($_SERVER['REQUSET_METHOD' === 'POST']) {
    add_user();
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>添加新成员</title>
    <link rel="stylesheet" href="bootstrap.css">
    <style>
    form{
        width: 80%;
        margin: 0 auto;
    }
    </style>
</head>

<body>
    <div class="container py-5">
        <h1 class="display-4">添加新成员</h1>
        <hr>
        

        
    </div>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
        <div class="form-group">
            <label for="avatar">头像</label>
            <input type="file" name="avatar" id="avatar" class="form-control">
        </div>
        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" name="name" id="name" class="form-control">
        </div>
        <div class="form-group">
            <label for="gender">性别</label>
            <select type="file" name="gender" id="gender" class="form-control" >
            <option value="-1">请选择性别</option>
            <option value="0">男</option>
            <option value="1">女</option>
            </select>

        </div>
        <div class="form-group">
            <label for="birthday"></label>
            <input type="date" name="birthday" id="birthday" class="form-control" >
        </div>
        <button class="btn btn-primary btn-block">保存</button>
    </form>
</body>

</html>