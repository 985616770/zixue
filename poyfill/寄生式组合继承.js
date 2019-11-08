function Person(name, age) {
    this.age = age;
    this.name = name;
}
Person.prototype.say = function() {
    console.log(this.name);
};

function Student(name, age, grade) {
    Person.call(this, name, age);
    this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.sing = function() {
    console.log(this.grade);
};
let x = new Student('aa', 12, 4);
console.table(x);
