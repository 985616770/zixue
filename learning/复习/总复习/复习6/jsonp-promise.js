// JSONP
function getJSONP(url, data) {
  return new Promise((resolve, reject) => {
    // 自定义名称
    var r1 = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k'];
    var name = 'getJSONP';
    for (let i = 0; i < r1.length; i++) {
      name += r1[Math.floor(Math.random() * r1.length)];
    }
    var cbName = 'getJSONP.' + name;
    // 替换url地址
    if (url.indexOf('?') == -1) {
      url += '?jsonp=' + cbName;
    } else if (url.indexOf('&') == -1) {
      url += 'jsonp=' + cbName;
    } else {
      url += '&jsonp=' + cbName;
    }
    // 动态创建script
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    // 调用回调函数(根据后台定义)
    getJSONP[name] = data => {
      delete getJSONP[name];
      script.parentNode.removeChild(script);
      if (data) {
        resolve(data);
      } else {
        reject('没有返回数据');
      }
    };
  });
}

getJSONP('http://class.imooc.com/api/jsonp')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

  var $ = {
    ajax: function(options) {
      var xhr = null,
        url = options.url,
        method = options.method || 'GET',
        data = options.data || null,
        success = options.success,
        error = options.error,
        async = typeof options.async === 'undefined' ? true : options.async, //布尔设定默认值
        param = '';
  
      // 创建xhr对象
      if (typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest();
      } else if (typeof ActiveXObject !== 'undefined') {
        var xhrArr = [
          'Microsoft.XMLHTTP',
          'MSXML2.XMLHTTP.6.0',
          'MSXML2.XMLHTTP.5.0',
          'MSXML2.XMLHTTP.4.0',
          'MSXML2.XMLHTTP.3.0',
          'MSXML2.XMLHTTP.2.0'
        ];
        var len = xhr.length;
        for (var i = 0; i < len; i++) {
          try {
            xhr = new ActiveXObject(xhrArr[i]);
            break;
          } catch (ex) {}
        }
      } else {
        throw new Error('不支持XHR');
      }
  
      //处理data
      if (data) {
        for (var i in data) {
          param += i + '=' + data[i] + '&';
        }
        param = param.replace(/&$/, '');
      }
      // 处理URL
      if (method === 'GET') {
        url += '?' + param;
      }
      // 发送请求
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            success && success(JSON.parse(xhr.responseText));
          } else {
            error && error();
          }
        }
      };
      xhr.open(method, url, async);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(param);
    },
    jsonp: function(url, callback) {
      // 创建随机字符串
      var str = 'getJSONP',
        strArr = [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n'
        ];
      for (var i = 0; i < strArr.length; i++) {
        str += strArr[Math.floor(Math.random() * strArr.length)];
      }
      var cbName = 'jsonp.' + str;
      if (url.indexOf('?') != -1) {
        url += '&jsonp=' + cbName;
      } else {  
        url += '?jsonp=' + cbName;
      }
      // 动态创建script标签
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
      
        $.jsonp[str] = function(data) {
        try {
          callback && callback.call(that,data);
        } catch (e) {
        } finally {
          // delete jsonp[str];
          // script.parentNode.removeChild(script);
        }
      };
    }
  };
  