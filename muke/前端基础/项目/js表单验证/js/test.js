var choose = document.getElementById('choose'),
  submit = document.getElementById('submit'),
  Total = document.getElementById('Total'),
  items = document.querySelectorAll('p.item_');
var userInput = {
  userPass: document.getElementById('userPass'),
  userPass_: document.getElementById('userPass_')
};
// 获得焦点时
var tips = {
  userAccount: "6-30位字母、数字或'_'",
  userPass: '6-20位字母,数字或符号',
  userPass_: '请确认两次密码相同',
  userName: '请输入您的中文名字',
  information: '请输入您的身份证号码',
  email: '请输入您邮箱的正确格式',
  telephone: '请输入您的手机号码'
};
// 为空时
var tipsError = {
  userAccount: '请您务必写入用户名!',
  userPass: '请您务必写入密码!',
  userPass_: '请务必再次确认密码',
  userName: '请务必写入您的姓名',
  information: '请您务必写入身份证号码!',
  email: '请您务必写入邮箱!',
  telephone: '请您务必11位手机号码!'
};

// 验证失败时
var tipsNot = {
  userAccount: "6-30位字母、数字或'_'",
  userPass: '请输入6-20位字母,数字或符号',
  userPass_: '两次密码不相同',
  userName: '请输入中文名并确认是正确格式',
  information: '请输入身份证号码正确格式',
  email: '请输入邮箱正确格式',
  telephone: '请您务必11位手机号码!'
};
var exp = {
  userAccount: /^\w{6,30}$/,
  userPass: /^\w{6,30}$/,
  userPass_: /^\w{6,30}$/,
  userName: /^[\u4e00-\u9fa5]{2,5}$/,
  information: /^\d{17}[0-9xX]$/,
  email: /^\w+@\w+\.[a-z0-9_]+$/,
  telephone: /^\d{11}$/
};
function verify(n1, n2, n3) {
  n1.parentElement.nextElementSibling.innerHTML = n2;
  n1.parentElement.nextElementSibling.style.color = n3;
}
Total.addEventListener('focusin', function(event) {
  var target = event.target;
  if (target.id == 'Total') return;
  verify(target, tips[target.id], 'red');
});

Total.addEventListener('focusout', function(event) {
  var target = event.target;

  if (target.id == 'Total' || target.id == 'choose') return;

  if (!target.value) {
    console.log(!!target.value);
    verify(target, tipsError[target.id], 'red');
    return;
  }

  if (exp[target.id].exec(target.value)) {
    if (target.id == 'userPass_' && userPass.value != target.value) {
      verify(target, tipsNot[target.id], 'yellow');
      return;
    }
    verify(target, '格式正确', 'green');
  } else {
    verify(target, tipsNot[target.id], 'yellow');
  }
});

submit.addEventListener('click', function() {
  if (
    choose.checked == true &&
    Array.prototype.every.call(items, function(e) {
      return e.style.color == 'green';
    })
  ) {
    submit.nextElementSibling.innerHTML = `<span style="color:green;float:right">填写正确</span>`;
  } else {
    submit.nextElementSibling.innerHTML = `<span style="color:red;float:right">填写错误,请检查</span>`;
  }
});
