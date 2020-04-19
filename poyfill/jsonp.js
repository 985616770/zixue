// JSONP
function getJSONP(url, data) {
  return new Promise((resolve, reject) => {
    // 自定义名称
    var r1 = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k']
    var name = 'getJSONP'
    for (let i = 0; i < r1.length; i++) {
      name += r1[Math.floor(Math.random() * r1.length)]
    }
    var cbName = 'getJSONP.' + name
    // 替换url地址
    if (url.indexOf('?') == -1) {
      url += '?jsonp=' + cbName
    } else if (url.indexOf('&') == -1) {
      url += 'jsonp=' + cbName
    } else {
      url += '&jsonp=' + cbName
    }
    // 动态创建script
    var script = document.createElement('script')
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
    // 调用回调函数(根据后台定义)
    getJSONP[name] = data => {
      delete getJSONP[name]
      script.parentNode.removeChild(script)
      if (data) {
        resolve(data)
      } else {
        reject('没有返回数据')
      }
    }
  })
}

getJSONP('http://class.imooc.com/api/jsonp')
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
