window.addEventListener('click', function() {
    var args = arguments;
    console.log(args);
});

function A() {
    let a = 1;
}

let b = new A();
console.log(b);