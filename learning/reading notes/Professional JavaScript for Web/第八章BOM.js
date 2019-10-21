/*
 * @Author: xuanjidd 
 * @Date: 2018-07-15 15:47:30 
 * @Last Modified by: xaunjidd
 * @Last Modified time: 2018-07-17 16:58:42
 * 
 * 高级程序设计第八章
 */

//8.1.1 window对象和全局作用域
// var age = 29;

// function sayAge() {
//     console.log(this.age);
// }

// console.log(age);
// sayAge();
// Window.sayAge();

//8.1.2窗口关系及框架
//第八章.html

//8.1.3窗口位置
// var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
// var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;

//8.1.4窗口位置
//兼容代码 ---获取页面可视区域的高宽
// var pageWidth = window.innerHeight,
//     pageHeight = window.innerWidth;
// if (typeof pageWidth != "number") {
//     if (document.compatMode == "CSS1Compat") {
//         pageHeight = document.documentElement.clientHeight;
//         pageWidth = document.documentElement.clientWidth;
//     } else {//ie
//         pageHeight = document.body.clientHeight;
//         pageWidth = document.body.clientWidth;
//     }
// }

//8.1.5导航和打开窗口

// window.open("www.baidu.com", "_blank");


//弹出窗口屏蔽程序
// var blocked = false;

// try {
//     var wrox = window.open("http://www.wrox.com", "_blank");
//     if (wrox == null) {
//         blocked = true;
//     }
// } catch (ex) {
//     blocked = true;
// }
// if (blocked) {
//     console.log("the popup was blocked");

// }


//8.1.6 间隙调用和超时调用
//间隙调用
// var num = 0,
//     max = 10,
//     interfac = null;

// function incrementNumber() {
//     num++;
//     if (num == max) {
//         clearInterval(interfac);
//         console.log("done");
//     }
// }
// interfac = setInterval(incrementNumber, 500);
// //超时调用
// var num = 10,
//     max = 10;

// function incrementNumbers() {
//     num++;
//     if (num < max) {
//         setTimeout(incrementNumbers, 500);
//     } else {
//         console.log( "done");
//     }
// }
// setTimeout(incrementNumbers, 500);

//8.1.7 系统对话框

// if (confirm("are you sure?")) {
//     alert("im so");
// } else {
//     alert("sdasds")
// }

//8.2 location对象

//查询字符串参数
function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    for (i = 0; i < len; i++) {
        item = item[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }

    }
    return args;
}

//8.3 navigator对象
function hasPlugin(name) {
    name = name.toLowerCase();
    for (var i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}

//检测Flash
console.log();

//检测Ie的插件
function hasIEPlugin(name) {
    try {
        new ActiveXObject(name);
        return true;
    } catch (ex) {
        return false;
    }
}

//检测所有的浏览器的插件
function hasFlash() {
    var result = hasPlugin("Flash");
    if (!result) {
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash")
    }
    return result;
}

//8.4 screen对象
// window.resizeTo(screen.availWidth, screen.availHeight);

//8.5 history对象
if (history.length == 0) {
    console.log("用户浏览的第一个页面"); 
}