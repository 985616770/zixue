// 单体（Singleton）模式
// 绝对是JavaScript中最基本最有用的模式。

/* 
单体在JavaScript的有多种用途，
它用来划分命名空间。*****
可以减少网页中全局变量的数量(在网页中使用全局变量有风险)；
可以在多人开发时避免代码的冲突(使用合理的命名空间)等等。
在中小型项目或者功能中，
单体可以用作命名空间把自己的代码组织在一个全局变量名下；
在稍大或者复杂的功能中，
单体可以用来把相关代码组织在一起以便日后好维护。　　

*/
var functionGroup = {
  name: 'Darren',
  method1: function() {
    // code
  },
  method2: function() {
    // code
  }
};

//
var functionGroup = new (function myGroup() {
  this.name = 'Darren';
  this.getName = function() {
    return this.name;
  };
  this.method1 = function() {};
})();
