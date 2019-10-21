const method = require('./common');
var add = function(a, b) {
  return a + b;
};

// the method invocation pattern

/**x
 * `this` refer  to the object
 */
var myObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};
myObject.increment();
// console.log(myObject.value);

myObject.increment(2);
// console.log(myObject.value);

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
// console.log(myObject.value);

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
// console.log(myQuo.get_status());

// The Apply Invocation Pattern

/**
 * `this` depend on apply
 */

var array = [3, 4];
var sum = add.apply(null, array);
// console.log(sum);

var statusObject = {
  status: 'A-OK'
};

var status = Quo.prototype.get_status.apply(statusObject);
// console.log(status);

// Arguments

/**
 * can achieve lots of unknown numbers for add
 */
var sum = function() {
  var i,
    sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
};

// console.log(sum(1, 2, 34, 56, 4));

// Exception

var add = function(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
};

// console.log(add(3, 4));

// if try block has error
// the catch block will deal with error and warning your code
var try_it = function() {
  try {
    add('seven');
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
  }
};

// try_it();

// augmenting Types

/**
 * add function to all function
 */

// Function.prototype.method = function(name, func) {
//   this.prototype[name] = func;
//   return this;
// };

Number.method('interger', function() {
  return Math[this < 0 ? 'ceil' : 'floor'](this); //Math["ceil"||"floor"]()
});

console.log((-10 / 3).interger());

String.method('trim', function() {
  return this.replace(/\s+/g, '');
});
console.log(`    sd 2`.trim());

// polyfill

Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

// hanoi 问题

var hanoi = function(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log(`move disc ${disc} from ${src} to ${dst}`);
    hanoi(disc - 1, aux, src, dst);
  }
};
// hanoi(3,'A','B','C')

// DOM tree
var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

var getElementByAttribute = function(att, value) {
  var result = [];
  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (
      typeof actual === 'string' &&
      (actual === value || typeof value !== 'string')
    ) {
      results.push(node);
    }
  });
};

// sample
var factorial = function(i, a) {
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i - 1, a * i);
};

console.log(factorial(12));

// scope

var foo = function() {
  var a = 3,
    b = 5;
  var bar = function() {
    var b = 7,
      c = 11;
    a += b + c;
  };
};

var myObject = (function() {
  var value = 0;
  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function() {
      return value;
    }
  };
})();

console.log(myObject);

var quo = function(status) {
  return {
    get_status: function() {
      return status;
    }
  };
};

var myQuo = quo('amazed');
console.log(myQuo.get_status());

// callbacks
// request = prepare_the_request();
// send_request_asynch

// modules
String.method(
  'deentityify',
  (function() {
    var entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    };
    return function() {
      return this.replace(/&([^&:]+);/g, function(a, b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      });
    };
  })()
);

// console.log('&lt;&quot;&gt;'.deentityify());

var serial_maker = function() {
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();

// console.log(seqer);

// cascade

// 类似于jQuery的链式调用

//柯里化(curry)
Function.method('curry', function() {
  var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;
  return function() {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

var add1 = add.curry(1);
console.log(add1(3));

// Memorization

var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

// for (let i = 0; i < 10; i++) {
//   console.log(`0: ${fibonacci(i)}`);
// }

var fibonacci = function() {
  var memo = [0, 1];
  var fib = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
      console.log(memo);
    }
    return result;
  };
  return fib;
};
console.log(fibonacci()(10));

// 专门用来记忆的函数
var memorizer = function(memo, formula) {
  var recur = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
};

var fibonacci = memorizer([0, 1], function(recur, n) {
  return recur(n - 1) + recur(n - 2);
});
