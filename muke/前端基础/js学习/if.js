// var password = prompt('请设置你的密码');

// if (password.length != 6) {
//   alert('6位数字');
// } else if (isNaN(password)) {
//   alert('请输入6位数字');
// } else {
//   alert('正确');
// }

var str = 'abc123';
var num = parseInt(str);
console.log(num);
if (num == NaN) {
  alert(nan);
} else if (num == 123) {
  alert('123');
} else if(typeof num == 'number'){
  alert('num');
}else{
  alert('str')
}
