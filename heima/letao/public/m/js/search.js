$(() => {
  $('.ct_search a').on('tap', () => {
    const key = $.trim($('input').val());
    if (!key) {
      // mui 消息提示
      mui.toast('请输入关键字再搜索');
    } else {
      // eslint-disable-next-line no-restricted-globals
      location.href = `./searchList.html?key=${key}`;
    }
  });
});
