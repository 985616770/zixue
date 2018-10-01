<?php

require_once 'config.php';
/**
 *
 * 封装公用函数
 * 校验数据当前访问用户的 箱子
 */
session_start();

/**
 *获取当前的登陆用户信息.如果没有获取到自动跳转到登录页面
 */
function xiu_get_current_user()
{
    if (empty($_SESSION['current_login_user'])) {
        //没有当前登陆用户信息,意味着没有登录
        header('Location:/admin/login.php');
        exit(); //没有必要执行
    }
    return $_SESSION['current_login_user'];
}
xiu_get_current_user();
/**
 * 定义函数注意:函数名与内置函数冲突问题
 * JS判断方式 : typeof fn === 'function';
 * PHP判断函数是否定义的方式:function_exist()
 */

//数据库连接,
/**
 * 获取多条数据
 */
  
function xiu_fetch_all($sql){
$conn = mysqli_connect(XIU_DB_HOST, XIU_DB_USER, XIU_DB_PASS, XIU_DB_NAME);
    if (!$conn) {
        exit('连接失败');
    }
    $query = mysqli_query($conn, $sql);
    if (!$query) {
        //查询失败
        return false;
    }  
    while ($row = mysqli_fetch_assoc($query)) {
        $result[] = $row;
    }
    mysqli_free_result($query);
    mysqli_close($conn);
    return $result;
}
/**
 * 获取单条数据(第一条)
 */
function xiu_fetch_one($sql){
    $res = xiu_fetch_all($sql);
    return isset($res[0])?$res[0]:null;
}
/**
 * 非查询语句,增删改
 */
function xiu_execute($sql){
   $conn = mysqli_connect(XIU_DB_HOST, XIU_DB_USER, XIU_DB_PASS, XIU_DB_NAME);
    if (!$conn) {
        exit('连接失败');
    }
    $query = mysqli_query($conn, $sql);
    if (!$query) {
        //查询失败
        return false;
    }
    //对于增删改类 的操作
    $affected_rows = mysqli_affected_rows($conn);
    mysqli_close($conn);
    return $affected_rows;
}