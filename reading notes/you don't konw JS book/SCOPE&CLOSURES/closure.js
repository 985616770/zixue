function wait(message) {
  setTimeout(() => {
    console.log(message);
  }, 1000);
}
wait('as');

// for (var i = 1; i <= 5; i++) {
//   (function(j) {
//     setTimeout(() => {
//       console.log(j);
//     }, j * 1000);
//   })(i);
// }

// for (let i = 1; i <= 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   },i*1000);
// }

function CoolMoudule() {
  var something = 'cool';
  var another = [1, 2, 3];
  function doSomething() {
    console.log('something');
  }
  function doAnother() {
    console.log('object');
  }
  return {
    doSomething,
    doAnother
  };
}

var foo = CoolMoudule();
foo.doAnother();
foo.doSomething();

var MyModule = (function Manager() {
  var modules = {};
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }
  function search() {
    return modules;
  }
  return {
    define,
    get,
    search
  };
})();

MyModule.define('bar', [], function() {
  function hello(who) {
    return 'Let me introduce: ' + who;
  }

  return { hello };
});

MyModule.define('foo', ['bar'], function(bar) {
  var hungry = 'hipo';
  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }
  return { awesome };
});

var bar = MyModule.get('bar');
var foo = MyModule.get('foo');

console.log(bar.hello('ss'));
foo.awesome();
console.log(MyModule.search());
