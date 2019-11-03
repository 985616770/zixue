/* eslint-disable no-undef */
(function() {
  const itemTmpl = `
  <a class="$key tab-item" href="../$key/$key.html">
      <div class="tab-name">$text</div>
  </a>`;

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

    const arr = window.location.pathname.split('/');
    const page = arr[arr.length - 1].replace('.html', '');

    $(`a.${page}`).addClass('active');
  }
  init();
})();
