/*??*/
window.lt = {};
/*??*/
lt.getUrlParams = function() {
  /*õget???? ?key=1&name=10*/
  var search = location.search;
  /*????  ??*/
  var params = {};
  /*??*/
  /*û?û?*/
  if (search.indexOf('?') == 0) {
    search = search.substr(1);
    var arr = search.split('&');
    for (var i = 0; i < arr.length; i++) {
      /*itemArr name=10  ----> [name,10]*/
      var itemArr = arr[i].split('=');
      params[itemArr[0]] = itemArr[1];
    }
  }
  return params;
};
/*¼  ?¼ */
lt.ajaxFilter = function(options) {
  $.ajax({
    type: options.type || 'get',
    url: options.url || location.pathname,
    data: options.data || {},
    dataType: options.dataType || 'json',
    beforeSend: function() {
      options.beforeSend && options.beforeSend();
    },
    success: function(data) {
      /* error   400  ?¼ ?¼?  ?url*/
      if (data.error == 400) {
        location.href = '/m/user/login.html?returnUrl=' + location.href;
      } else {
        options.success && options.success(data);
      }
    },
    error: function() {
      options.error && options.error();
    }
  });
};
