function* s() {
    console.log('11');
    yield '1';
    console.log('21');
    yield '2';
    console.log('31');
    yield '3';
    console.log('41');
    yield '4';
}

let a = s();
console.log(a);
a.next();
a.next();
let c = [...s()];
console.log(c);
