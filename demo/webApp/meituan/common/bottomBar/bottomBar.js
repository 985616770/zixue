/* eslint-disable no-undef */
(function() {
  const itemTmpl = `
  <a class="$key btn-item" href="/$key/$key.html">
      <div class="tab-icon"> </div>
      <div class="btn-name">$text</div>
  </a>`;

  function init() {
    const items = [
      {
        key: 'index',
        text: '首页'
      },
      {
        key: 'order',
        text: '订单'
      },
      {
        key: 'my',
        text: '我的'
      }
    ];

    let str = '';
    items.forEach(item => {
      str += itemTmpl.replace(/\$key/g, item.key).replace('$text', item.text);
    });
    $('.bottom-bar').append($(str));

    const arr = window.location.pathname.split('/');
    const page = arr[arr.length - 1].replace('.html', '');

    $(`a.${page}`).addClass('active');
  }
  init();
})();
