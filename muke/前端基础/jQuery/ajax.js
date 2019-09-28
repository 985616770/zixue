// 封装通用的xhr对象
function creatXHR() {
  // 检测是否有XMLHttpRequest对象(IE,火狐,opera)
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != 'undefined') {
    // ie
    var xhrArr = [
      'Microsoft.XMLHTTP',
      'MSXML2.XMLHTTP.6.0',
      'MSXML2.XMLHTTP.5.0',
      'MSXML2.XMLHTTP.4.0',
      'MSXML2.XMLHTTP.3.0',
      'MSXML2.XMLHTTP.2.0'
    ];
    for (var i = 0; i < xhrArr.length; i++) {
      try {
        xhr = new ActiveXObject(xhrArr[i]);
        break;
      } catch (ex) {}
      return xhr;
    }
  } else {
    throw new Error('The brower don not have XMLHttpRequest object');
  }
}

var xhr = creatXHR();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
      // do something there ..
    }
  }
};
xhr.open('POST', './server', true);
