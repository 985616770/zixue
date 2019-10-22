/* 
　闭包：关于闭包这个月在园子里有几篇不错的分享了，在这我也从最实际的地方出发，说说我的理解。

　　　　1.闭包最常用的方式就是返回一个内联函数（何为内联函数？就是在函数内部声明的函数）；

　　　　2.在JavaScript中有作用域和执行环境的问题，在函数内部的变量在函数外部是无法访问的，在函数内部却可以得到全局变量。由于种种原因，我们有时候需要得到函数内部的变量，可是用常规方法是得不到的，这时我们就可以创建一个闭包，用来在外部访问这个变量。

　　　　3.闭包的用途 主要就是上一点提到的读取函数内部变量，还有一个作用就是可以使这些变量一直保存在内存中。

　　　　4.使用闭包要注意，由于变量被保存在内存中，所以会对内存造成消耗，所以不能滥用闭包。解决方法是 在退出函数之前，将不使用的局部变量全部删除。 */

function f() {
  var n = 999;
  function f1() {
    alert((n += 1));
  }
  return f1;
}
var result = f();
result(); // 1000
result(); // 1001
result(); // 1002

/* 　私有属性和方法：函数有作用域，在函数内用var 关键字声明的变量在外部无法访问，私有属性和方法本质就是你希望在对象外部无法访问的变量。

　　特权属性和方法：创建属性和方法时使用的this关键字，因为这些方法定义在构造器的作用域中，所以它们可以访问到私有属性和方法；只有那些需要直接访问私有成员的方法才应该被设计为特权方法。

　　共有属性和方法：直接链在prototype上的属性和方法，不可以访问构造器内的私有成员，可以访问特权成员，子类会继承所有的共有方法。

　　共有静态属性和方法：最好的理解方式就是把它想象成一个命名空间，实际上相当于把构造器作为命名空间来使用。 */
/* -- 封装 -- */
var _packaging = function() {
  //私有属性和方法
  var name = 'Darren';
  var method1 = function() {
    //...
  }; //特权属性和方法
  this.title = 'JavaScript Design Patterns';
  this.getName = function() {
    return name;
  };
};
//共有静态属性和方法
_packaging._name = 'Darren code';
_packaging.alertName = function() {
  console.log(_packaging._name);
}; //共有属性和方法
_packaging.prototype = {
  init: function() {
    //...
  }
}; //先声明一个超类

/* 继承本身就是一个抽象的话题，在JavaScript中继承更是一个复杂的话题，因为JavaScript想要实现继承有两种实现方式，分别是类式继承和原型式继承，每种实现的方式都需要采取不少措施，下面本人通过分析例子的方式讲解JavaScript中这个很重要的话题。 */
/* -- 类式继承 -- */

function Person(name) {
  this.name = name;
} //给这个超类的原型对象上添加方法 getName
Person.prototype.getName = function() {
  returnthis.name;
}; //实例化这个超类
var a = new Person('Darren1');
alert(a.getName()); //再声明类
function Programmer(name, sex) {
  //这个类中要调用超类Person的构造函数，并将参数name传给它
  Person.call(this, name);
  this.sex = sex;
} //这个子类的原型对象等于超类的实例
Programmer.prototype = new Person();
//因为子类的原型对象等于超类的实例，所以prototype.constructor这个方法也等于超类构造函数，你可以自己测试一下，如果没这一步，alert(Programmer.prototype.constructor)，这个是Person超类的引用，所以要从新赋值为自己本身
Programmer.prototype.constructor = Programmer; //子类本身添加了getSex 方法
Programmer.prototype.getSex = function() {
  return this.sex;
}; //实例化这个子类
var _m = new Programmer('Darren2', 'male'); //自身的方法
alert(_m.getSex()); //继承超类的方法
alert(_m.getName());

/* -- 原型式继承 -- */
//clone()函数用来创建新的类Person对象
var clone = function(obj) {
  var _f = function() {};
  //这句是原型式继承最核心的地方，函数的原型对象为对象字面量
  _f.prototype = obj;
  return new _f();
};
//先声明一个对象字面量
var Person = {
  name: 'Darren',
  getName: function() {
    return this.name;
  }
};
//不需要定义一个Person的子类，只要执行一次克隆即可
var Programmer = clone(Person); //可以直接获得Person提供的默认值，也可以添加或者修改属性和方法
alert(Programmer.getName());
Programmer.name = 'Darren2';
alert(Programmer.getName()); //声明子类,执行一次克隆即可

var Someone = clone(Programmer);
