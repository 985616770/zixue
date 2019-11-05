/* eslint-disable no-undef */
(function() {
  // 定义模板字符串
  const itemTmpl = `
  <a class="$key tab-item" href="../$key/$key.html">
      <div class="tab-name">$text</div>
  </a>`;

  // 定义传入的参数
  function init() {
    const items = [
      {
        key: 'menu',
        text: '点餐'
      },
      {
        key: 'comment',
        text: '评价'
      },
      {
        key: 'restaurant',
        text: '商家'
      }
    ];

    let str = '';
    items.forEach(item => {
      str += itemTmpl.replace(/\$key/g, item.key).replace('$text', item.text);
    });
    $('.tab-bar').append($(str));
    // 切换页面的方法
    const arr = window.location.pathname.split('/');
    const page = arr[arr.length - 1].replace('.html', '');

    $(`a.${page}`).addClass('active');
  }
  init();
})();
