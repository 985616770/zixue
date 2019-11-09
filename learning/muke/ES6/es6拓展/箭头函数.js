const obj = {
    name: 'xiaoming',
    say() {
        console.log(this.name);
    },
    say2: () => {
        console.log(name);
    }
};
// obj.say();
// obj.say2();

let xiaoming = {
    name: 'xiaoming',
    getAge: () => {
        setTimeout(() => {
            setTimeout(() => {
                console.log(this);
            }, 1);
        }, 1000);
    }
};

xiaoming.getAge();
