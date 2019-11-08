let imgsUrl = [
    'http://pic1.win4000.com/wallpaper/2019-10-31/5dba8e1768a57.jpg',
    'http://pic1.win4000.com/wallpaper/3/59914c437c099.jpg'
];
const loadImg = src => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.src = src;
        img.onload = () => {
            resolve(img);
        };
        img.onerror = e => {
            reject(e);
        };
    });
};

Promise.all(imgsUrl.map(src => loadImg(src))).then(arr => {
    console.log(arr);
    arr.forEach(item => document.body.appendChild(item));
});
