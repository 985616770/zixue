/**
 * 
 * @param {
 * 红宝书的源代码如下
 * 
 * } name 
 */
//6.1

// var person = new Object();
// person.name = "Nicholas";
// person.age = 26;
// person.sayName = function () {
//     alert(this.name);
// };
// var person = {
//     name: "Nisss",
//     age: 298,
//     job: "sortware",
//     sayName: function () {
//         alert(this.name);
//     }
// };

//6.1.1

// var person = {};
// Object.defineProperty(person, "name", {
//     writable: false,
//     value: "asd"
// });
// console.log(person.name);
// delete person.name;
// var person = {};
// Object.defineProperty(person, "name", {
//     configurable: false,
//     value:"asd"
// });
// Object.defineProperty(person, "name", {
//     configurable: true,
//     value: "AAA"
// });
// console.log(person.name);
// var book = {
//     _year: 2004,
//     edition: 1
// };
// Object.defineProperty(book, "year", {
//     get: function () {
//         return this._year;
//     },
//     set: function (newValue) {
//         if (newValue > 2004) {
//             this._year = newValue;
//             this.edition += newValue - 2004;
//         }
//     }
// });
// book.year = 2005;
// console.log(book.edition);
// var book = {
//     _year: 2004,
//     edition: 2
// };
// book.__defineGetter__("year", function () {
//     return this.year;
// });
// book.__defineSetter__("year", function (newValue) {
//     if (newValue > 2004) {
//         this._year = newValue;
//         this.edition += newValue - 2004;
//     }
// });
// book.year = 2005;
// console.log(book.edition);

//6.1.2

// var book = {};
// Object.defineProperties(book, {
//     _year: {
//         writable: true,
//         value: 2004
//     },
//     edition: {
//         writable: true,
//         value: 1
//     },
//     year: {
//         get: function () {
//             return this._year;
//         },
//         set: function (newValue) {
//             if (newValue > 2004) {
//                 this._year = newValue;
//                 this.edition += newValue - 2004;
//             }
//         }
//     }
// });

//6.1.3 读取属性的特性

// var book = {};
// Object.defineProperties(book, {
//     _year: {
//         value: 2004
//     },
//     edition: {
//         value: 1
//     },
//     year: {
//         get: function () {
//             return this._year;
//         },
//         set: function (newValue) {
//             if (newValue > 2004) {
//                 this._year = newValue;
//                 this.edition += newValue - 2004;
//             }
//         }
//     },
// });

// var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
// console.log(descriptor.value);
// console.log(descriptor.configurable);
// console.log(typeof descriptor.get);
// var descriptor = Object.getOwnPropertyDescriptor(book,"year");
// console.log(descriptor.value);
// console.log(descriptor.configurable);
// console.log(typeof descriptor.get);

//6.2 创建对象

//6.2.1 工厂模式
// function createPerson(name,age,job) {
//     var o = new Object();
//     o.name = name;
//     o.age = age;
//     o.job = job;
//     o.sayName = function () {
//         return (this.name);
//     };
//     return o;
// }
// var person1= createPerson("sa",22,"sadasdas");
//  function sayName() {
//         return (this.name);
//  }
// function Person(name,age,job) {

//     this.name = name;
//     this.age = age;
//     this.job = job;
//     this.sayName = sayName
//   }

// var person2= new Person("sad",11,"323");
// var o = new Object();
// Person.call(o,"sd",22,"asd");

// console.log(o.sayName());

//6.2.3 原型模式

// function Person() {}
// Person.prototype.name = "sad";
// Person.prototype.age = 22;
// Person.prototype.job = "sda";
// Person.prototype.sayName = function() {
//   console.log(this.name);
// };
// var person1 = new Person();
// person1.sayName();
// console.log(Person.prototype.isPrototypeOf(person1));
// console.log(Object.getPrototypeOf(person1).name);

// person1.name = "sadaa";
// console.log(person1.name);
// delete person1.name;
// console.log(person1.name);
// console.log("name" in person1);
// //判断name是否存在 object的原型中
// function hasPrototypeProperty(object, name) {
//   return !object.hasOwnProperty(name) && name in object;
// }

// function Person() {}
// Person.prototype = {
//   name: "Nicholas",
//   age: 29,
//   job: "ssss",
//   sayName: function() {
//     console.log(this.name);
//   }
// };
// //重构构造函数
// Object.defineProperty(Person.prototype, "constructor", {
//   enumerable: false,
//   value: Person
// });
// console.log(Object.keys(Person.prototype));
// console.log(Object.getOwnPropertyNames(Person.prototype));

//原型的动态性
// function Person() {}
// var friend = new Person();
// Person.prototype = {
//   constructor: Person,
//   name: "Nicholas",
//   age: 29,
//   sayName: function() {
//     console.log(this.name);
//   }
// };
// friend.sayName();//报错 ,因为指向最初的原型

//原生对象的原型
// String.prototype.startsWith = function(text) {
//   return this.indexOf(text) == 0;
// };
// var msg = "Hello world";
// console.log(msg.startsWith("Hello"));

// //原型对象的问题
// function Person() {}
// Person.prototype = {
//   constructor: Person,
//   name: "sdas",
//   friends: ["aa", "dd"],
//   sayName: function() {
//     console.log(this.name);
//   }
// };
// var person1 = new Person();
// var person2 = new Person();
// console.log(person1.friends);
// console.log(person2.friends);
// person1.sayName();

//组合使用构造函数和原型模式
// function Person(name, age, job) {
//   this.name = name;
//   this.age = age;
//   this.job = job;
//   this.firend = ["s", "sa"];
// }
// Person.prototype = {
//   constructor: Person,
//   sayName: function() {
//     console.log(this.name);
//   }
// };
// var person1 = new Person("Nicholas", 11, "sadsa", "sasss");
// person1.firend.push("sdd");
// console.log(person1.firend);

//6.2.5 动态原型模式
// function Person(name, age, job) {
//   //属性
//   this.name = name;
//   this.age = age;
//   this.job = job;
//   //方法
//   if (typeof this.sayName != "function") {
//     Person.prototype.sayName = function() {
//       console.log(this.name);
//     };
//   }
// }
// var person1 = new Person("Nicholas", 11, "sadsa");
// person1.sayName();
// console.log(person1.sayName instanceof Function);

//6.2.6寄生构造函数模式
// function Person(name, age, job) {
//   var o = new Object();
//   o.name = name;
//   o.age = age;
//   o.job = job;
//   o.sayName = function() {
//     console.log(this.name);
//   };
//   return o;
// }
// var friend = new Person("sdad", 22, "sadasd");
// friend.sayName();

//6.2.7稳妥构造函数
// function Person(name, age, job) {
//   var o = new Object();
//   var name = name,
//     age = age,
//     job = job;
//     o.sayName = function () {
//         return name;
//     }
//     var piliv = function () {
//         return name+ "  "+ age+ "  "+ job;
//     }
//     var a = new Array();
//     a[0] = piliv;
//     a[1] = o;
//     return a;
// }
// var person1 = new Person("12",33,"23");
// console.log(person1[0]());
// console.log(person1[1].sayName());


//6.3继承
//6.3.1 原型链
// function SuperType() {
//     this.property = true;
// }
// SuperType.prototype.getSuperValue = function () {
//     return this.property;
//   }
//   function SubType(){
//       this.subproperty = false;
//   }
//继承了SuperType
// SubType.prototype = new SuperType();
// SubType.prototype.getSubValue = function () {
//     return this.subproperty;
//   }
// var instance  = new SubType();
// console.log(instance.getSuperValue());

// 原型链的问题
// function SuperType() {
//     this.colors = ["red","blue","green"];
// }
// function SubType() {

// }
// SubType.prototype = new SuperType();
// var instance = new SubType();
// instance.colors.push("black");
// console.log(instance.colors);
// var instance1 = new SubType();
// console.log(instance1.colors);

//6.3.3 组合继承
// function SuperType(name) {
//     this.name = name;
//     this.colors = ["red", "blue"];
// }
// SuperType.prototype.sayName = function () {
//     console.log(this.name);
// }

// function SubType(name, age) {
//     SuperType.call(this, name);
//     this.age = age;
// }

// SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function () {
//     console.log(this.age);
// }

// var instance1 = new SubType("asd",11);
// instance1.colors.push("balck");
// console.log(instance1.colors);

//6.3.4原型式继承

// function object(o) {
//     function F() {  }
//     F.prototype = o;
//     return new F();
// }

// var person = {
//     name : "Nicholas",
//     friends:["Shelby","Count"]
// };

// var anotherPerson = Object.create(person,{
//     name:{
//         value:"sdasd"
//     }
// });
// anotherPerson.name = "GGG";
// anotherPerson.friends.push("sad");
// console.log(person.friends);
// console.log(anotherPerson.name);


//6.3.5寄生式继承

// function createAnother(original) {
//     var clone = Object.create(original);
//     clone.sayHi = function () {
//         console.log("hi");
//     };
//     return clone;
// }
// var person = {
//     name:"Nicholas",
//     friends: ["asd","sadsa"]
// };
// var anotherPerson = createAnother(person);
// anotherPerson.sayHi();


//6.3.6 寄生组合式继承

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "yellow", "green"];
}
SuperType.prototype.sayName = function () {
    console.log("sss");
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

function inheritPrototype(SubType, SuperType) {
    var prototype = Object.create(SuperType.prototype);
    prototype.constructor = SubType;
    SubType.prototype = prototype;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

var instance = new SubType("aaa",11);
instance.sayAge();

/**
 * 总结:
 * 1创建对象的几种方式:工厂模式,构造函数,原型模式
 * 2继承的实现方式:原型式继承,组合继承(常用),寄生式继承,寄生组合式继承(比较完美)
 * 
 * 基本类型 null, undefined,number ,string,
 * 
 * 
 * 
 *  */