// 生成器函数
function* g() {
    console.log('1');
    yield '~hhhh';
    console.log('2');
    yield '~sdfa';
}

let a = g();
// console.log(a);

let arr = [1, 2, 34, 5, 667];

// console.log(arr.keys());
for (const i of arr.entries()) {
    console.log(i);
}
