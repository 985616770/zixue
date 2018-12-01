/**
 * 路由模块
 * 处理不同的请求方法
 */
const fs = require('fs');
const Student = require('./student');

const express = require('express');

const router = express.Router();

/**
 * 渲染学生列表页面
 */

router.get('/students', function(req, res) {
  Student.find(function(err, students) {
    if (err) {
      return res.status(500).send('Server error.');
    }
    res.render('index.html', {
      fruits: ['苹果', '香蕉', '橘子'],
      students: students
    });
  });
});
/**
 * 渲染添加学生页面
 */
router.get('/students/new', function(req, res) {
  res.render('new.html');
});
/**
 * 渲染编辑学生页面
 */
router.get('/students/edit', function(req, res) {

  Student.findById(parseInt(req.query.id), function(err, student) {
    if (err) {
      return res.status(500).send('Server error.');
    }
    res.render('edit.html', {
      student: student
    });
  });
});
/**
 * 处理删除学生
 */
router.get('/students/delete', function(req, res) {
  Student.deleteById(req.query.id, function(err) {
    if (err) {
      return res.status(500).send('Server error.');
    }
    res.redirect('/students');
  });
});
/**
 * 处理添加学生
 */
router.post('/students/new', function(req, res) {
  Student.save(req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error');
    }
    res.redirect('/students');
  });
});
/**
 * 处理编辑学生
 */
router.post('/students/edit', function(req, res) {
  Student.updateById(req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.');
    }
    res.redirect('/students');
  });
});

// 导出router

module.exports = router;
