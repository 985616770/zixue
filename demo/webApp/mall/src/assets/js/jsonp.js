import jsonp from 'jsonp';

/**
 * 转换对象为字符串
 * @param {object} param
 */
const parseParam = param => {
  const params = [];

  for (const item of Object.entries(param)) {
    params.push(item);
  }

  return params.map(item => item.join('=')).join('&');
};

/**
 * 转换jsonp 为 promise 对象
 */
export default (url, data, options) => {
  url += `${url.indexOf('?') < 0 ? '?' : '&'}${parseParam(data)}`;

  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
