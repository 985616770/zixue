const express = require('express');
const express_template = require('express-art-template');
const app = express();

app.engine('art', require('express-art-template'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
});

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
app.use('/public/', express.static('./public/'));
app.use('/views/', express.static('./views/'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/' + 'views/index.html', function(err, data) {
    res.render('index.art', {
      comments: comments
    });
  });
});

app.get('/post', function(req, res) {
  res.sendFile(__dirname + '/' + 'views/post.html');
});

app.get('/pinglun', function(req, res) {
  const comment = req.query;
  comment.dateTime = '2017-12-1 17212';
  comments.unshift(comment);

  res.redirect(302, '/');
});

app.listen(3000, function() {
  console.log('app is running');
});
