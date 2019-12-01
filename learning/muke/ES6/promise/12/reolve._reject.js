// simple value

let p1 = new Promise(resolve => {
    resolve('success');
});

let p2 = Promise.resolve('success');

// p1 === p2
function a(val) {
    return new Promise((resolve, reject) => {
        if (val) {
            resolve('suc');
        }
        reject('err');
    });
}

// a('a')
//     .then(s => {
//         console.log(s);
//         resolve('success')
//     })
//     .catch(s => {
//         console.log(s);
//         return Promise.reject('error');
//     })
//     .then(s => {
//         console.log(s);
//     })
//     .catch(s => {
//         console.log(s);
//     });

/*
 *  a new promise be pass in
 */

// const por = new Promise((resolve, reject) => {
//     reject('o.o');
// });

// let p = Promise.resolve(por);
// p.then(data => void console.log(data)).catch(err => void console.log(err));
// console.log(p === por);
/*
 * thenable => duck type
 * FIXME:
 */
let obj = {
    then(cb) {
        console.log('running');
        cb('!.!');
    }
};

// Promise.resolve(obj).then(data => {
//     console.log(data);
// });

/**
 * Promise.reject
 *
 */

// Promise.reject({
//     then(cb) {
//         console.log(1);
//         cb('2');
//     }
// }).then(data => console.log(data), err => console.log(err));

//  sync  => async

// function ca(fn) {
//     return Promise.resolve(fn).then(fn => fn());
// }

async function createAsync(fn) {
    fn = await Promise.resolve(fn);
    return fn();
}

createAsync(() => {
    console.log('async');
    return 2;
}).then(data => console.log(data));

console.log('sync');
