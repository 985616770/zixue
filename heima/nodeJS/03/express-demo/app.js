const express = require('express');
var bodyParser = require('body-parser');

const app = express();

const comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
];
// 公开制定目录
app
  .engine('html', require('express-art-template'))
  .use('/public/', express.static('./public/'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .get('/', function(req, res) {
    res.render('index.html', {
      comments: comments
    });
  })
  .get('/post', function(req, res) {
    res.render('post.html');
  })
  .post('/post', function(req, res) {
    const comment = req.body;
    comment.dateTime = '2017-12-1 17212';
    comments.unshift(comment);
    res.redirect(302, '/');
  })
  .listen(3000, function() {
    console.log('app is running');
  });
