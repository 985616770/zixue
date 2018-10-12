$(() => {
  // 使用json数据存储历史记录
  // 预设一个 key  history list
  // 存储的的是JSON格式数据

  // 1.默认根据历史记录渲染历史列表
  const historyListJson = localStorage.getItem('historyList') || '[]';
  let historyListArr = JSON.parse(historyListJson);
  // 获取当前的数据
  // 只能在数组中用foreach

  const render = () => {
    let html = '';
    historyListArr.forEach((ele, i) => {
      html += `<li><span>${ele}</span><a data-index="${i}" href= "javascript:;">删除</a></li>`;
    });
    html = html || '<li>没有搜索数据</li>';

    $('ul').html(html);
  };
  render();
  // 2.点击搜索的时候更新历史记录渲染列表
  $('[type="button"]').on('click', () => {
    const key = $.trim($('[type=search]').val());
    if (!key) {
      console.log('请输入搜索关键字');
      return false;
    }
    // 追加历史 保存 以及渲染
    historyListArr.push(key);
    localStorage.setItem('historyList', JSON.stringify(historyListArr));
    render();
    return true;
  });
  // 3.点击删除掉时候删除对应历史记录渲染列表
  $('ul').on('click', 'a', () => {
    const index = $(this).data('index');
    historyListArr.splice(index, 1);
    localStorage.setItem('historyList', JSON.stringify(historyListArr));
    render();
  });

  // 4.点击清空的时候清空历史记录渲染列表
  $('div a').on('click', () => {
    historyListArr = [];
    localStorage.setItem('historyList', '');
    render();
  });
});
