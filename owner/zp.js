// 自用函数库
var $ = {
  // 转化为驼峰
  toCameCase: function(str) {
    return str.replace(pattern, function(all, letter) {
      return letter.toUpperCase();
    });
  },
  // 替换特殊符号
  htmlEscape: function(text) {
    return text.replace(/[<>&"]/g, (match, pos, originalText) => {
      switch (match) {
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '&':
          return '&amp;';
        case '"':
          return '&quot;';
      }
    });
  }
};
