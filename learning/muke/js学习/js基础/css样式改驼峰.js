var str = 'border-top-width';

// 方法一
// function cameBack(str) {
//   var unitArr = str.split('-');
//   var newArr = unitArr[0];
//   for (let i = 1; i < unitArr.length; i++) {
//     let element = unitArr[i];
//     var firstP = element.slice(0, 1).toUpperCase();
//     var firstS = element.slice(1);
//     newArr += `${firstP}${firstS}`;
//   }
//   return newArr;
// }


// 方法二
function cameBack(str) {
  var arr = str.split('-');
  var newArr = arr[0];
  for (let i = 1; i < arr.length; i++) {
    var toUC = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    newArr += toUC;
  }
  return newArr;
}
console.log(cameBack(str));
