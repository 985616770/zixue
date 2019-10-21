// 软绑定的源码 
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this;
    var curried = [].slice.call(arguments, 1);
    var bound = function() {
      return fn.apply(
        !this || this === (window || global) ? obj : this,
        curried.concat.apply(curried, arguments)
      );
    };
    bound.prototype = Object.create(fn.prototype);
    return bound;
  };
}


function foo() {
  console.log("name: " + this.name);
}

var obj = {name:"obj"},
    obj2 = {name:"obj2"}

var objOBJ = foo.softBind(obj)

// objOBJ();

obj2.foo = foo.softBind(obj)
// obj2.foo();

console.log(typeof null);