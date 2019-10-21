exports.foo = 123;
module.exports.a = 341;

exports = {
  a: 456
};

module.exports.foo = 'haha'

exports.c = 456;

exports = module.exports;
exports.a = 789;
module.exports = function () {
  console.log('hello');
}