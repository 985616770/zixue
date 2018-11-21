$(() => {
  $('#submit').on('tap', () => {
    /* get form serialize data */
    /* name attr */
    const data = $('form').serialize();
    console.log(data);
    /* valid */
    // eslint-disable-next-line spaced-comment
    /* data type "key=value && "*/
    const dataObject = CT.serialize2object(data);
    console.log(dataObject);

    if (!dataObject.username) {
      mui.toast('请输入用户名');
      return false;
    }
    if (!dataObject.password) {
      mui.toast('请输入密码');
      return false;
    }
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: dataObject,
      dataType: 'json',
      success: (data) => {
        // 如果成功 跳转
        //  如果没有 跳转个人中心
        if (data.success === true) {
          // 业务成功
          const returnUrl = location.search.replace('?returnUrl=', '');
          if (returnUrl) {
            location.href = returnUrl;
          } else {
            location.href = CT.userUrl;
          }
        } else {
          // 业务失败
          mui.toast(data.message);
        }
      }
    });
  });
});
