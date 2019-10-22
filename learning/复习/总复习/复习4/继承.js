function Person(type) {
  this.type = type;
}

Person.prototype.walk = function() {
  console.log(this.type + '居然可以走');
};

function Student(name, type) {
  Person.call(this, type);
  this.name = name;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.sing = function() {
  console.log(this.name + '唱的还满好听的');
};

var xm = new Student('小明', '人');
xm.walk();
xm.sing();
