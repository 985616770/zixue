<h1>全部人员名单</h1>


 <!-- var_dump($_GET); -->
 <!--  $_GET 用于接收 URL 地址中的提交数据（一般是 GET 参数 --> 
 <!-- var_dump($_POST); -->
 <!--  $_POST 用于接收 请求体 中提交的数据（一般是 POST 提交的数据 --> 
 <!-- var_dump($_REQUEST); -->
<!-- $_REQUEST = $_GET + $_POST -->
编号: <?php echo $_POST["username"] ?><br>
姓名: <?php echo $_POST["name"] ?><br>
邮箱: <?php echo $_POST["email"] ?><br>
网址: <?php echo $_POST["site"] ?>