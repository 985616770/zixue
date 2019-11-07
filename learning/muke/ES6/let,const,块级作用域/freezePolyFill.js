// 实现常量的

/**
 * 1. 遍历属性和方法
 * 2. 修改遍历到的属性的描述
 * 3. Object.seal()
 */
Object.defineProperty(Object, 'freezePolyFill', {
    value: function(obj) {
        var item;
        for (item in obj) {
            if (obj.hasOwnProperty(item)) {
                if (typeof obj[item] === 'object') {
                    Object.freezePolyFill(obj[item]);
                } else {
                    Object.defineProperty(obj, item, {
                        writable: false
                    });
                }
            }
        }
        Object.seal(obj);
    }
});

// 例子

var obj = {
    a: '22',
    c: 'sfdf',
    b: {
        a: 1,
        w: { q: 's' }
    }
};

Object.freezePolyFill(obj);
obj.a = 2;
obj.b.a = 3;
obj.b.w.q = 3;
console.log(obj);
