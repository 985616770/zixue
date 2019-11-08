var obj = {
    _name: '11'
    // 第一种方法
    // get name() {
    //     return this._name;
    // },
    // set name(val) {
    //     this._name = val;
    // }
};
Object.defineProperty(obj, 'name', {
    get: function () {
        console.log('输出中');
        return this._name;
    },
    set: function (val) {
        console.log('设置中');
        this._name = val;
    }
});
console.log(obj.name);
