function getDate() {
  var today = new Date();
  var weeks =['日','一','二','三','四','五','六']
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var week = today.getDay();
  var hour = today.getHours();
  var minute = today.getMinutes();
  var second = today.getSeconds();
  var time = today.getTime();
  console.log(`现在是: ${year}年${month}月${day}日${hour}时${minute}分${second}秒 星期${weeks[week]} 
  距宇宙毁灭 还有${time}`);
}

getDate();