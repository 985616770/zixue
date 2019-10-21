/*
 * @Author: xuanji
 * @Date: 2018-11-29 09:20:47
 * @LastEditors: xuanji
 * @LastEditTime: 2018-11-30 22:05:32
 * @Description: file content
 */
/*
 * @Author: xuanji
 * @Date: 2018-11-29 09:20:47
 * @LastEditors: xuanji
 * @LastEditTime: 2018-11-30 22:28:36
 * @Description: file content
 */
/**
 * 处理数据模块
 * 只处理数据
 * 封装异步代码
 *
 */

const fs = require('fs');

const dbPath = './db.json';

/**
 * @msg: 获取学生列表
 * @param {function}  callback 回调函数
 * @return:
 */
exports.find = function(callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).students);
  });
};
/**
 * 根据 ID 获取学生信息对象
 * @param {Number} ID 学生ID
 * @param {Function} callback 回调函数
 */
exports.findById = function(id, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }
    const students = JSON.parse(data).students;
    const ret = students.find(function(item) {
      return item.id === parseInt(id);
    });
    callback(null, ret);
  });
};
/**
 * @msg: 保存学生
 * @param {object}  student 单个对象
 * @param {Function}  回调函数
 */
exports.save = function(student, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }
    const students = JSON.parse(data).students;

    student.id = students[students.length - 1].id + 1;
    students.push(student);

    const fileData = JSON.stringify({
      students: students
    });

    fs.writeFile(dbPath, fileData, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};
/**
 * 更新学生信息
 * @param {object} 对象
 * @param {Function} 回调函数
 */
exports.updateById = function(student, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }
    const students = JSON.parse(data).students;

    student.id = parseInt(student.id);

    const stu = students.find(function(item) {
      return item.id === student.id;
    });

    for (let key in student) {
      stu[key] = student[key];
    }

    const fileData = JSON.stringify({
      students: students
    });

    fs.writeFile(dbPath, fileData, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};
/**
 * 删除学生
 * @param {Number} ID
 * @param {Function} 回调函数
 */
exports.deleteById = function(id, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }
    const students = JSON.parse(data).students;

    const deleteId = students.findIndex(function(item) {
      return item.id === parseInt(id);
    });

    students.splice(deleteId, 1);
    const fileData = JSON.stringify({
      students: students
    });

    fs.writeFile(dbPath, fileData, function (err) {
      if(err){
        return callback(err);
      }
      callback(null)
    })
  });
};
