// 解决回调地狱

function f() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

f()
    .then(() => {
        console.log(1);
        return f();
    })
    .then(() => {
        console.log(2);
        return f();
    })
    .then(() => {
        console.log(2);
        return f();
    })
    .then(() => {
        console.log(3);
        return f();
    })
    .then(() => {
        console.log(4);
        return f();
    });
