// 工厂（Factory）模式：提供一个创建一系列相关或相互依赖对象的接口，而无需指定他们具体的类。
/* 
工厂就是把成员对象的创建工作转交给一个外部对象，好处在于消除对象之间的耦合(何为耦合？就是相互影响)
通过使用工厂方法而不是new关键字及具体类，
可以把所有实例化的代码都集中在一个位置，
有助于创建模块化的代码，
这才是工厂模式的目的和优势。 */
var XMLHttpFactory = function() {}; //这是一个简单工厂模式
XMLHttpFactory.createXMLHttp = function() {
  var XMLHttp = null;
  if (window.XMLHttpRequest) {
    XMLHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    XMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  return XMLHttp;
}; //XMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象。
var AjaxHander = function() {
  var XMLHttp = XMLHttpFactory.createXMLHttp();
};

/* 
工厂模式又区分简单工厂模式和抽象工厂模式，
上面介绍的是简单工厂模式，这种模式用的更多也更简单易用。
抽象工厂模式的使用方法就是 - 先设计一个抽象类，这个类不能被实例化
只能用来派生子类，最后通过对子类的扩展实现工厂方法。
*/
var XMLHttpFactory = function() {}; //这是一个抽象工厂模式
XMLHttpFactory.prototype = {
  //如果真的要调用这个方法会抛出一个错误，它不能被实例化，只能用来派生子类
  createFactory: function() {
    throw new Error('This is an abstract class');
  }
}; //派生子类，文章开始处有基础介绍那有讲解继承的模式，不明白可以去参考原理
var XHRHandler = function() {
  XMLHttpFactory.call(this);
};
XHRHandler.prototype = new XMLHttpFactory();
XHRHandler.prototype.constructor = XHRHandler; //重新定义createFactory 方法
XHRHandler.prototype.createFactory = function() {
  var XMLHttp = null;
  if (window.XMLHttpRequest) {
    XMLHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    XMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  return XMLHttp;
};
