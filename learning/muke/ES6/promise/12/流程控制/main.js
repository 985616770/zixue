function moveTo(el, x, y) {
    return new Promise(resolve => {
        el.style.transform = `translate(${x}px,${y}px)`;
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

let el = document.querySelector('div');

document.querySelector('button').addEventListener('click', e => {
    moveTo(el, 100, 100)
        .then(() => {
            console.log('1');

            return moveTo(el, 100, 0);
        })
        .then(() => {
            console.log('2');
            return moveTo(el, 40, 100);
        })
        .then(() => {
            console.log('3');
            return moveTo(el, 420, 330);
        })
        .then(() => console.log('结束了'));
});
