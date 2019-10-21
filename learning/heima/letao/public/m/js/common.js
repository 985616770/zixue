/* eslint-disable prefer-destructuring */
window.CT = {};
CT.loginUrl = '/m/user/login.html';
CT.cartUrl = '/m/user/cart.html';
CT.userUrl = '/m/user/index.html';
// 对象存储
CT.getParamsbyUrl = function() {
  // 对象存储
  const params = {};
  let search = location.search;
  if (search) {
    search = search.replace('?', '');
    /* 如果有多个键值对 */
    const arr = search.split('&');
    arr.forEach((item, i) => {
      const itemArr = item.split('=');
      params[itemArr[0]] = itemArr[1];
    });
  }
  console.log(params);
  return params;
};

// sign in
CT.loginAjax = function(params) {
  $.ajax({
    type: params.type || 'get',
    url: params.url || '#',
    data: params.data || '',
    dataType: params.dataType || 'json',
    // eslint-disable-next-line object-shorthand
    success: function(data) {
      // for sign in {error 400 return false}
      if (data.error === 400) {
        location.href = `${CT.loginUrl}?returnUrl${location.href}`;
        return false;
      } 
        params.success && params.success(data);
      
    },
    error() {
      mui.toast('服务器繁忙');
    }
  });
};

/* json 兼容性 json2.js 解决ie67版本 */
CT.serialize2object = function(serializeStr) {
  const obj = {};
  /* key = value && k=v */
  if (serializeStr) {
    const arr = serializeStr.split('&');
    arr.forEach((item, i) => {
      const itemArr = item.split('=');
      console.log(itemArr);
      obj[itemArr[0]] = itemArr[1];
    });
  }
  return obj;
};
