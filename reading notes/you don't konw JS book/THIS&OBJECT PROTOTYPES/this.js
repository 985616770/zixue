// function foo(num) {
//   console.log("foo: " + num);
//   this.count++;
// }
//
// foo.count = 0;
// var i;
// for (i=0;i<10;i++){
//   if (i>5) {
//     // 使用call（..）可以确保this指向函数对象foo对象
//     foo.call(foo, i)
//   }
// }
//
// console.log(foo.count);

// function foo() {
//   var a = 2;
//   this.bar();
// }
//
// function bar() {
//   console.log(this.a);
// }
//
// foo();

function baz() {
  console.log("baz")
  bar();
}

function bar() {
  console.log( "bar")
  foo();
}

function foo() {
  console.log("foo")
}