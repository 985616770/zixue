function addEvent(ele, type, fn, boolean = 'true') {
  if (ele.addEventListener) {
    ele.addEventListener(type, fn, boolean);
  } else if (ele.addAttach) {
    ele.addAttach('on' + type, fn, boolean);
  } else {
    ele['on' + type] = fn;
  }
}
