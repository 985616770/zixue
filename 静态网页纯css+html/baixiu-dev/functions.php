<?php
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
        exit();//没有必要执行
    }
    return $_SESSION['current_login_user'];
}

/**
 * 定义函数注意:函数名与内置函数冲突问题
 * JS判断方式 : typeof fn === 'function';
 * PHP判断函数是否定义的方式:function_exist()
 */