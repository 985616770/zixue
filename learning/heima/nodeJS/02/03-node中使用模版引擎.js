const template = require('art-template');
const fs = require('fs');

fs.readFile('./tpl.html', function(err, data) {
  if (err) {
    return console.log('读取失败');
  }
  const ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: ['写代码', '唱歌', '打游戏'],
    title: '个人信息'
  });

  console.log(ret);
});
