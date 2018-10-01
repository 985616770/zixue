/*
 * @Author: xuanjidd 
 * @Date: 2018-07-20 08:50:10 
 * @Last Modified by: xaunjidd
 * @Last Modified time: 2018-07-23 16:16:24
 * 
 *第十章Dom
 */

//10.1 节点层次
//NODE类型 节点关系
var firstChild = someNode.childNodes[0]; //方括号
var secondChild = someNode.childNodes.item(1); //item
var count = someNode.childNodes.length; //length 类数组

//转换类数组为数组

var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes, 0);

function convertToArray(nodes) {
    var array = null;
    try {
        array = Array.prototype.slice.call(nodes, 0); //针对非IE浏览器
    } catch (ex) {
        array = new Array();
        for (var i = 0, len = nodes.length; i < len; i++) {
            array.push(nodes[i]);
        }
    }
    return array;
}

if (someNode.nextSibling === null) {
    alert("Last node in the parent's childNodes list.");
} else if (someNode.previousSilbling === null) {
    alert("First node in the parent's childNodes list.");
}
//10.1.2 document
//外部html
//10.1.3 element
if (Element.tagName.toLowerCase() == "div") { //适合各种文档 

}

//attributes
function outputAttributes(element) {
    var paires = new Array(),
        attrName,
        attrValue,
        i,
        len;
    for (i = 0, len = element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        paires.push(attrName + "+\"" + attrValue + "\"");
    }
    return paires.join(" ");
}

//创建元素的兼容代码(ie7)
if (client.brower.ie && client.brower.ie <= 7) {
    //创建一个带NAme的特性的iframe元素
    var iframe = document.createElement("<iframe name=\"myName\"></iframe>");
    //创建input元素
    var input = document.createElement("<input type=\"checkbox\">")
    //创建button元素
    var button = document.createElement("<button type =\"reset\">");
    //创建单选按钮
    var radio1 = document.createElement("<input type = \"radio\" name = \"chioce\" value =\"1\" >");
    var radio2 = document.createElement("<input type =\"ridio\" name = \"choice\" value= \"2\" >");
}

//元素的子节点
for (var i = 0, len = element.childNodes.length; i < len; i++) {
    if (element.childNodes[i].nodeType == 1) {
        //执行某些操作
    }
}
var ul = document.getElementById("mylist");
var items = document.getElementsByTagName("li");




//TEXT 类型

//创建文本节点
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("hello world");
element.appendChild(textNode);
document.body.appendChild(element);

//规范文本节点

var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("hello world");
element.appendChild(textNode);

var anotherTextNode = document.createTextNode("Yippee");
element.appendChild(anotherTextNode);

document.body.appendChild(element);

console.log(element.childNodes.length);
element.normalize();

//分割文本节点
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("hello world");
element.appendChild(textNode);

var anotherTextNode = document.createTextNode("Yippee");
element.appendChild(anotherTextNode);

document.body.appendChild(element);

console.log(element.childNodes.length);
var newNode = element.firstChild.splitText(5);



//Comment类型 ---注释节点
var div = document.getElementById("myDiv");
var comment = div.firstChild;
console.log(comment.data);
/* <div id = "myDiv"><!--A comment--></div> */
var comment = document.createComment("A comment ");


//CDATASection类型 ---基于XML的文档注释
/* <div id = "myDiv"><![CDATA[A comment]]></div> */
document.createCDATASection("传入节点内容")

//DocumentType类型 --- 文档类型文本

// <!DOCTYPE HTML PUPILC "-//W3C//DTD HTML 4.01//EN">

//DocumentFragment 类型 --- "轻量级" 文档 插入的是子孙代 且本身不占据文档位置

var fragment = document.createDocumentFragment();
var ul = document.getElementById("myList");
var li = null;

for (var i = 0; i < 3; i++) {
    li = document.createElement("li");
    li.appendChild(document.createTextNode("Item " + (i + 1)));
    fragment.appendChild(li);
}
ul.appendChild(fragment);


//attr 类型


var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);
console.log(element.attributes["align"].value);

//DOM操作技术

//动态脚本

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "client.js";
document.body.appendChild(script);

function loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}

function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code)); //ie不支持
    } catch (ex) {
        script.text = code;
    }
    document.body.appendChild(script);
}

//动态样式

var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "styles.css";
var head = document.getElementsByClassName("head")[0];
head.appendChild(link);

function loadStyles(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}


function loadStyleString(css) {
    var style = document.createElement("link");
    style.type = "text/css";
    try {
        style.appendChild(document.createTextNode(css));
    } catch (ex) {
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}

//操作表格

var table = document.createElement("table");
table.border = 1;
table.width = "100%";

var tbody = document.createElement("tbody");
table.appendChild(tbody);

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("Cell 2,1"));

tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("Cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("Cell 2,2"));
document.body.appendChild(table);

//10.2.4nodelist

var divs = document.getElementsByTagName("div"),
    i,
    div;

// for (var i = 0; i < divs.length; /*会导致无限循环*/ i++) {
//     div = document.createElement("div");
//     document.body.appendChild(div);
// }


for (var i = 0, len = divs.length; i < len;i++) {
    div = document.createElement("div");
    document.body.appendChild(div);
}