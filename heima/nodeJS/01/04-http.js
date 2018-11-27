// 加载http模块
const http = require('http');

// 使用http.creatSever()方法创建一个web服务器
// 返回一个Sever实例
const server = http.createServer();

// 提供服务(对数据的服务)
// 发请求=>接受请求=>处理请求=>发送响应
server.on('request', function(request, response ) {

  console.log('收到客户端的请求,请求路径是: ' + request.url);

  if (request.url == '/index') {
    response.write('index');
    response.end()
  } else if(request.url == '/login'){
    response.write('login');
    response.end()
  }else{
    response.write('123');
    response.end()
  }
});
// 启动端口号,启动服务器
server.listen(3000, function() {
  console.log('服务器启动成功了,可以通过http://127.0.0.1:3000/ 来进行访问');
});
