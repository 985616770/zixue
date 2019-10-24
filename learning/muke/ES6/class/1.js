class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // static getName() {
  //   return this.name;
  // }
  getName() {
    return this.name;
  }
}
class Student extends Person {
  constructor(name, age) {
    super(name, age);
  }
}

var a = new Student('xiaoming', 18);
// console.log(Student.getName());
console.log(a.getName());
console.dir(a);
