var week = new Date().getDay();
var weekStr = '';

switch (week) {
  case 0:
    weekStr = '日';
    break;
  case 1:
    weekStr = '一';
    break;
  case 2:
    weekStr = '二';
    break;
  case 3:
    weekStr = '三';
    break;
  case 4:
    weekStr = '四';
    break;
  case 5:
    weekStr = '五';
    break;

  default:
    weekStr = '六';
    break;
}
document.write(`今天是星期${weekStr}`)