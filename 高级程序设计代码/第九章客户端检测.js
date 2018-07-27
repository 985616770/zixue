/*
 * @Author: xuanjidd 
 * @Date: 2018-07-18 16:08:26 
 * @Last Modified by: xaunjidd
 * @Last Modified time: 2018-07-19 17:51:52
 * 第九章 客户端检测
 * 
 */

//9.1 能力检测( 兼容代码)

//获取元素ID的兼容代码
function getElement(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (document.all) { //ie
        return document.all[id];
    } else {
        throw new Error("NO way TO RETRIEVE ELEMENT!")
    }
}

//9.1.1更靠谱的能力检测

function isHostMethod(object, property) {
    var t = typeof object[property];
    return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown';
}

//9.2 怪癖检测(BUG)
var hasDontEnumQuirk = function () {
    var o = {
        toString: function () {}
    };
    for (var prop in o) {
        if (prop == "toString") {
            return false;
        }
    }
    return true;
}(); //

var hasDontEnumQuirk = function () {
    var o = {
        toString: function () {}
    };
    var count = 0;
    for (var prop in o) {
        if (prop == "toString") {
            count++;
        }
    }
    return (count > 1);
}(); //Safari 


//用户代理字符串检测技术

var client = function () {
    var engine = {
        //呈现引擎
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //具体的版本号
        ver: null
    };
    //检测浏览器

    var browser = {
        //ie
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        chrome: 0,
        opera: 0,
        //具体的版本
        ver: null
    };
    //在此检测呈现引擎,平台和设备
    return {
        engine: engine,
        browser: browser
    };
}();

if (client.engine.ie) { //如果是ie engine.ie的值应该大于0
    //针对ie的代码
} else if (client.engine.gecko > 1.5) {
    if (client.engine.ver == "1.8.1") {
        //针对这个版本执行某些操作
    }
}

//opera的检测(具有伪装性的用户代理)

if (window.opera) {
    engine.ver = window.opera.version();
    engine.opera = parseFloat(engine.ver);
}

//webkit的检测 ||  KHTML的检测

var ua = navigator.userAgent;

if (window.opera) { //opera的检测(具有伪装性的用户代理)
    engine.ver = window.opera.version();
    engine.opera = parseFloat(engine.ver);
} else if (/AppleWebKit\/(\S+)/.test(ua)) { //webkit的检测
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);
} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) { //khtml
    engine.ver = RegExp["$1"];
    engine.khtml = parseFloat(engine.ver);
} else if (/rv:([^\)]+) Gecko\/\d{8}/.test(ua)) { //gecko
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);
} else if (/MISE([^;]+)/.test(ua)) { //IE
    engine.ver = RegExp["$1"];
    engine.ie = parseFloat(engine.ver);
}

//检测呈现引擎及浏览器
var ua = navigator.userAgent;

if (window.opera) { //opera的检测(具有伪装性的用户代理)
    engine.ver = brower.ver = window.opera.version();
    engine.opera = browser.opera = parseFloat(engine.ver);
} else if (/AppleWebKit\/(\S+)/.test(ua)) { //webkit的检测
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);
    //确定是chrome  还是safari
    if (/Chrome\/(\S+)/.test(ua)) {
        brower.ver = RegExp["$1"];
        brower.safari = parseFloat(browser.ver);
    } else if (/Version\/(\S+)/.test(ua)) {
        brower.ver = RegExp["$1"];
        brower.safari = parseFloat(browser.ver);
    } else {
        var safariVersion = 1;
        if (engine.webkit < 100) {
            safariVersion = 1;
        } else if (engine.webkit < 312) {
            safariVersion = 1.2;
        } else if (engine.webkit < 412) {
            safariVersion = 1.3;
        } else {
            safariVersion = 2;
        }
        brower.safari = brower.ver = safariVersion;
    }
} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) { //khtml
    engine.ver = brower.ver = RegExp["$1"];
    engine.khtml = brower.konq = parseFloat(engine.ver);
} else if (/rv:([^\)]+) Gecko\/\d{8}/.test(ua)) { //gecko
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);
    //确定是不是firefox
    if (/Firefox\/(\S+)/.test(ua)) {
        brower.ver = RegExp["$1"];
        brower.firefox = parseFloat(browser.ver);
    }
} else if (/MISE([^;]+)/.test(ua)) { //IE
    engine.ver = brower.ver = RegExp["$1"];
    engine.ie = brower.ie = parseFloat(engine.ver);
}

var client = function () {
    var engine = {
        //呈现引擎
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //具体的版本号
        ver: null
    };
    //检测浏览器

    var browser = {
        //ie
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        chrome: 0,
        opera: 0,
        //具体的版本
        ver: null
    };
    var system = {
        win: false,
        mac: false,
        x11: false
    }
    //在此检测呈现引擎,平台和设备
    return {
        engine: engine,
        browser: browser,
        system: system
    };
}();

//检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = p.indexOf("X11") == 0 || (p.indexOf("Linux") == 0);

if (system.win) {
    if (/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
        if (RegExp["$1"] == "NT") {
            switch (RegExp["$2"]) {
                case "5.0":
                    system.win = "2000";
                    break;
                case "5.1":
                    system.win = "XP";
                    break;
                case "6.0":
                    system.win = "Vista";
                    break;
                case "6.1":
                    system.win = "NT";
                    break;
            }
        } else if (RegExp["$1"] == "9x") {
            system.win = "ME";
        } else {
            system.win = RegExp["$1"];
        }
    }
}

if (client.system.win) {
    if (client.system.win == "XP") {
        //说明是Xp
    } else if (client.system.win == "Vista") {
        //说明是Vista
    }
}
//移动设备
var client = function () {
    var engine = {
        //呈现引擎
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //具体的版本号
        ver: null
    };
    //检测浏览器

    var browser = {
        //ie
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        chrome: 0,
        opera: 0,
        //具体的版本
        ver: null
    };
    var system = {
        win: false,
        mac: false,
        x11: false,
        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false
    };


    //在此检测呈现引擎,平台和设备
    return {
        engine: engine,
        browser: browser,
        system: system
    };
}();

system.iphone = ua.indexOf("iPhone") > -1;
system.ipod = ua.indexOf("ipod") > -1;
system.ipad = ua.indexOf("ipad") > -1;
system.nokiaN = ua.indexOf("NokiaN") > -1;
//检测iOS的版本
if (system.mac && ua.indexOf("Mobile") > -1) {
    if (/CPU(?iPhone )?OS(\d+_\d+)/.test(ua)) {
        system.ios = parseFloat(RegExp.$1.replace("_", "."))
    } else {
        system.ios = 2;
    }
}
//检测安卓 的版本
if (/Android(\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp.$1);
}

//游戏系统-wii ps添加到client.system





























/**用户代理字符串检测脚本 
 * 完整代码())
 */

var client = function () {
    //呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //完整的版本号
        ver: null
    };
    //浏览器
    var brower = {
        //主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        //具体的版本号
        ver: null
    };
    //平台,设备和操作系统
    var system = {
        win: false,
        mac: false,
        x11: false,
        //移动设备
        iphone: false,
        ipod: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        //游戏系统
        wii: false,
        ps: false
    };
    //检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = brower.ver = window.opera.version();
        engine.opera = brower.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        brower.ver = RegExp["$1"];
        brower.webkit = parseFloat(engine.ver);

        if (/Chrome\/(\S+)/.test(ua)) {
            brower.ver = RegExp["$1"];
            brower.chrome = parseFloat(brower.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            brower.ver = RegExp["$1"];
            brower.safari = parseFloat(brower.ver);
        } else {
            //近似的确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            brower.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = brower.ver = RegExp["$1"];
        engine.khtml = brower.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
        //确定是不是firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            brower.ver = RegExp["$1"];
            brower.firefox = parseFloat(browser.ver);
        } else if (/MIDE([^;]+)/.test(ua)) {
            engine.ver = brower.ver = RegExp["$1"];
            engine.ie = brower.ie = parseFloat(engine.ver);
        }
    }
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = p.indexOf("X11") == 0 || (p.indexOf("Linux") == 0);

    if (system.win) {
        if (/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("ipod") > -1;
    system.ipad = ua.indexOf("ipad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    //windows mobiles
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }
    //检测ios
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU(?iPhone )?OS(\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."))
        } else {
            system.ios = 2;
        }
    }
    //检测安卓 的版本
    if (/Android(\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    return {
        engine: engine,
        brower: brower,
        system: system
    };

}();