let isDone: boolean = true

let isString: string = 'adf'

let isVoid: void = undefined || null

// undefined 和 null 是所有类型的子类型,
// void 类型的变量不能赋值给 number 类型的变量

let num: number = undefined || null

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
