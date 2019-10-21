function getUserInput(msg) {
  var input = prompt(msg);
  var parsed = parseInt(input);
  if (parsed != parsed) {
    return input;
  } else {
    return parsed;
  }
}
function multiple(a, b) {
  if (typeof a != 'number' || typeof b != 'number') {
    throw new Error('arguments should all be numbers');
  }
  return a * b;
}
function q(b) {
  return b;
}
var c;
var a = getUserInput('请输入一个数');
var b = getUserInput('请再输入一个数');

try {
  c = multiple(a, b);
  q(c);
  alert(`他们的乘积为: ${c}`);
} catch (e) {
  alert(`${e}`);
}
