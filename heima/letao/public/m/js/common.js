window.CT = {};

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

// 获取搜索数据
