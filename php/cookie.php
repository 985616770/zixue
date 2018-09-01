<?php 
//设置cookie
header('Set-Cookie: foo=bar');
setcookie('key','value');
//直传一个值是删除

setcookie('key');
//取cookie
var_dump($_COOKIE);

