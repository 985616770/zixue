// var myObject = {
//   a: 2
// };

// var anotherObject = {
//   a: 2
// };

// var myObject = Object.create(anotherObject);

// anotherObject.a;
// console.log(anotherObject.hasOwnProperty('a'));
// console.log(myObject.hasOwnProperty('a'));
// console.log(myObject.a);
// myObject.a++;
// console.log(myObject.a);
// console.log(myObject.hasOwnProperty('a'));

// function Foo(name) {
//   this.name = name;
//   this.myName = function() {
//     return this.name;
//   };
// }

// var a = new Foo('a');
// var b = new Foo('b');

// console.log(a.myName());
// console.log(b.myName());

function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}
Bar.prototype = Foo.prototype
Bar.prototype = new Foo()
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.myLabel = function() {
  return this.label;
};
var a = new Bar('a', 'obj a');
console.log(a.myName());
console.log(a.myLabel());


