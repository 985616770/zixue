// 实现常量的es5方法
/**
 * 1. 遍历属性和方法
 * 2. 修改遍历到的属性的描述
 * 3. Object.seal() => 
 */
Object.defineProperty(Object, 'freezePolyFill', {
    value: function(obj) {
        var item;
        for (item in obj) {
            if (obj.hasOwnProperty(item)) {
                Object.defineProperty(obj, item, {
                    writable: false
                });
            }
        }
        Object.seal(obj);
    }
});

// 例子

var obj = {
    a: '22',
    c: 'sfdf'
};

Object.freezePolyFill(obj);
obj.a = 2;
obj.b = 1;
console.log(obj);