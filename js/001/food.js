/**
 * 
 * Creat by Administrator on 2017 09 27 
 * 
 */
//自调用函数===食物的
(function () {
    var elements = [];//用于保存每个小方块食物的
    //食物就是一个对象,有宽,有高,有横纵坐标,先定义构造函数,然后创造对象
    function Food(x, y, width, height, color) {
        //横纵坐标
        this.x = x||0;
        this.y = y||0;
        //宽和高
        this.width = width||20;
        this.height = height||20;
        //背景颜色
        this.color = color ||"green";
    }
    //为原型添加初始化的方法(作用:在页面上显示这个食物)
    //因为食物要在地图上显示,所以,需要地图的这个参数(map--就是页面上的.class=map的这个div)
    Food.prototype.init = function (map) {
        //先删除这个小食物\
        //外部无法访问的函数
        remove();

        //创建div
        var div = document.createElement("div");
        //把div加入到map中
        map.appendChild(div);
        //设置div的样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //县脱离文档流
        div.style.position = "absolute";
        //随机横纵坐标
        this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y +"px";
        //把div加入到数组element中
        elements.push(div);
    }
    //私有的函数---删除事物的
    function remove() {
        //element数组中的有这个食物
        for (let i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //为找到这个子元素的父级元素,然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的这个子元素也要删除
            elements.splice(i,1)
        }
    }
    window.Food = Food;
}());