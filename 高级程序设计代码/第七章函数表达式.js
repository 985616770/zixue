/**
 * 第七章 函数表达式
 */

//7.1..1函数表达式
// if (true) {
//     sayHi = function () {
//         console.log("qweqw");

//     }

// } else {
//     sayHi = function () {
//         console.log("qwsaeqw");

//     }
// }

// //7.1递归
// function factorial(num) {
//     if (num <= 1) {
//         return 1;
//     } else {
//         return num * factorial(num - 1)
//     }   
// }//换名易导致错误

// function factorial(num) {
//     if (num <= 1) {
//         return 1;
//     } else {
//         return num * arguments.callee(num - 1)
//     }   
// }//使用arguments,callee 比较保险

//闭包

// function creatComparisonFunction(propertyName) {
//     return function (object1, object2) {
//         var value1 = object1[propertyName];
//         var value2 = object2[propertyName];

//         if (value1 < value2) {
//             return -1;
//         } else if (value1 > value2) {
//             return 1;
//         } else {
//             return 0;
//         }
//     };
// }

// var compareNames = creatComparisonFunction("name");
// var result = compareNames({
//     name: "Nichol"
// }, {
//     name: "Greg"
// });

// compareNames = null; //解除引用


//闭包和变量

// function createFunctions() {
//     var result = new Array();
//     for (var i = 0; i < 10; i++) {
//         result[i] = function (num) {
//             return function () {
//                 return num;
//             };
//         }(i);
//     }
//     return result;
// }
// console.log(createFunctions());

//关于this对象
// var name = "the";

// var object = {
//     name: "My Object",
//     getNameFuc: function () {
//         var that = this;
//         return function () {
//             return that.name;
//         };
//     }
// };

// console.log(object.getNameFuc()());

//内存泄漏

// function assignHandler() {
//     var element = document.getElementById("someElement");
//     var id = element.id;//副本
//     element.onclick = function () {
//         console.log(id);

//     }
//     element = null;//手动删除
// }

//模仿块级作用域
// (function () {
//     var now = new Date();
//     if (now.getMonth() == 0 && now.getDate() == 1) {
//         console.log("happy new Year!");
//     }
// })();

//7.4 私有变量

// function MyObject() { //构造函数中定义特权方法
//     var privateVarable = 10;

//     function privateFunction() {
//         return false;
//     }
//     this.pulicMethod = function () {
//         privateVarable++;
//         return privateFunction();
//     }
// }

// function Person(name) {//隐藏不应该直接修改的数据
//     this.getName = function () {
//         return name;
//     };
//     this.setName = function (value) {
//         name = value;
//     };
// }

// var person = new Person("sda");
// console.log(person.getName());
// person.setName("sdfa");
// console.log(person.getName());

//7.4.1静态私有变量

// (function () {
//     var privateVarable = 10;

//     function privateFunction() {
//         return false;
//     }
//     MyObject = function () {};
//     MyObject.prototype.pulicMethod = function () {
//         privateVarable++;
//         return privateFunction();
//     };
// })();

// (function () {
//     var name = "";
//     Person = function (value) {
//         name = value;
//     }
//     Person.prototype.getName = function () {
//         return name;
//     };
//     Person.prototype.setName = function (value) {
//         name = value;
//     };
// })();

// var person1 = new Person("Nicholas");
// console.log(person1.getName());
// person1.setName("steve")
// console.log(person1.getName());


//7.42模块模式

var singleton = function () {
    var privateVarable = 10;

    function privateFunction() {
        return false;
    }
    return {
        pulicProperty: true,
        pulicMethod: function () {
            privateVarable++;
            return privateFunction();
        }
    }
}();
console.log(singleton);


//7.4.3 增强的模块的模式

// var singleton = function () {
//     //私有变量
//     var privateVarable = 10;

//     function privateFunction() {
//         return false;
//     }
//     var object = new CustomType();

//     object.pulicProperty = true;
//     object.pulicMethod = function () {
//         privateVarable++;
//         return privateFunction();
//     };
//     return object;
// }();

// var application = function () {
//     var components = new Array();
//     components.push(new BaseComponent());
//     var app = new BaseComponent();
//     app.getComponentCount = function () {
//         return components.length;
//     }
//     app.registerComponent = function (component) {
//         if (typeof component == "object") {
//             components.push(component);
//         }
//     };
//     return app;
// }();