function addEvent(ele, type, fn, boolean = 'false') {
  if (ele.addEventListener) {
    ele.addEventListener(type, fn, boolean);
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, fn, boolean);
  } else {
    ele['on' + type] = fn;
  }
}
