class Human {
    constructor(sex) {
        this.sex = sex;
    }
    say() {
        console.log('h.h');
    }
}

class x extends Human {
    constructor(sex) {
        super(sex);
    }
    say() {
        super.say();
        console.log('o.o');
    }
}

class y extends Human {
    constructor(sex) {
        super(sex);
    }
    say() {
        super.say();
        console.log('q.q');
    }
}

class z extends Human {
    constructor(sex) {
        super(sex);
    }
    say() {
        super.say();
        console.log('z.z');
    }
}

new x('nan').say()
new y('nan').say()
new z('nan').say()