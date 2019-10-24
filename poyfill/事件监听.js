/*  */
function addEvent(ele, type, fn, bu = false) {
  if (ele.addEventListener) {
    ele.addEventListener(type, fn, bu);
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, fn, bu);
  } else {
    ele['on' + type] = fn;
  }
}
