var add = function(a, b) {
  return a + b;
};

// the method invocation pattern

/**
 * `this` refer  to the object
 */
var myObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};
myObject.increment();
console.log(myObject.value);

myObject.increment(2);
console.log(myObject.value);

// the function invocation pattern
var sum = add(3, 4);

/**
 * `this` refer to global object
 * so use that instead of `this`to solve the problem
 */
myObject.double = function() {
  var that = this;
  var helper = function() {
    that.value = add(that.value, that.value);
  };
  helper();
};

myObject.double();
console.log(myObject.value);

// The Constructor Invocation Pattern

/**
 * `this` refer to the new object
 */
var Quo = function(string) {
  this.status = string;
};

Quo.prototype.get_status = function() {
  return this.status;
};

var myQuo = new Quo('confused');
console.log(myQuo.get_status());


