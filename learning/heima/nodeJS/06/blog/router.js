const express = require('express');
const User = require('./models/user');
const md5 = require('blueimp-md5');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('index.html', {
    user: req.session.user
  });
});

router.get('/login', function(req, res) {
  res.render('login.html');
});

router.post('/login', function(req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  const body = req.body;

  User.findOne(
    {
      email: body.email,
      password: md5(md5(body.password))
    },
    function(err, user) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: err.message
        });
      }

      if (!user) {
        return res.status(200).json({
          err_code: 1,
          message: 'Email or password is invalid'
        });
      }
      // 通过 Session 记录登陆状态
      req.session.user = user;

      res.status(200).json({
        err_code: 0,
        message: 'OK'
      });
    }
  );
});

router.get('/register', function(req, res) {
  res.render('register.html');
});

router.post('/register', function(req, res) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  const body = req.body;
  User.findOne(
    {
      $or: [
        {
          email: body.email
        },
        {
          nickname: body.nickname
        }
      ]
    },
    function(err, data) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'The Server have error'
        });
      }
      if (data) {
        console.log(data);

        return res.status(200).json({
          err_code: 1,
          message: 'Email or nickname aleady exists.'
        });
      }

      body.password = md5(md5(body.password));

      new User(body).save(function(err, user) {
        if (err) {
          return res.status(500).json({
            err_code: 500,
            message: 'Internal error'
          });
        }

        req.session.user = user;
        res.status(200).json({
          err_code: 0,
          message: 'OK'
        });
      });
    }
  );
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/login');
});

module.exports = router;
