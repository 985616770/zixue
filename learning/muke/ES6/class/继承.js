class A {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(this.name);
    }
}

class B extends A {
    // constructor(age) {
    //     this.age = age;
    // }
    hi() {
        console.log('object');
    }
}


let c = new B('ss');
console.log(c.name);

