function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('1');
            resolve('data');
        }, 1000);
    });
}
function getData2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('2');
            resolve('data2');
        }, 300);
    });
}
function getData3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('3');
            reject('data3 err');
        }, 100);
    });
}

// let all = Promise.all([getData(), getData2(), getData3()]);
let all = Promise.race([getData(), getData2(), getData3()]);
all.then(arr => console.log(arr), err => console.log(err)); 
