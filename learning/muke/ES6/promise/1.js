/**
 * This module uses Promise API and make a JSONP request.
 *
 * @copyright MIT, 2018 Wendell Hu
 */

let uid = 0;
const enc = encodeURIComponent;
const defaultOptions = {
  prefix: '__jp',
  timeout: 60000,
  param: 'callback'
};

function doNothing() {}

/**
 * parameters:
 * - url: like http://somehostname:someport/to/some/path?with=true&orWithoutParams=false
 * - params: a plain object so we can help to parse them into url
 * - options: options to promise-jsonp
 *   - prefix {String}
 *   - timeout {Number}
 *   - name {String}: you can assign the callback name by your self, if provided, prefix would be invalid
 *   - param {String}: the key of callback function in request string
 *
 * thanks to Promise, you don't have to pass a callback or error handler
 *
 * @param {String} url
 * @param {Object} options
 * @param {Object} params
 * @returns {Promise}
 */
function pjsonp(url, params = {}, options) {
  if (!options) {
    options = params;
    params = {};
  }

  if (!options) options = {};

  // merge default and user provided options
  options = Object.assign({}, defaultOptions, options);
  const callbackName = options.name || options.prefix + uid++;

  let timer;
  let script;
  let target;

  // remove a jsonp request, the callback function and the script tag
  // this is important for performance problems caused by closure
  function clean() {
    script.parentNode && script.parentNode.removeChild(script);
    timer && clearTimeout(timer);
    window[callbackName] = doNothing; // use nothing function instead of null to avoid crash
  }

  // prepare url
  url += url.indexOf('?') > 0 ? '' : '?';
  for (let key in params) {
    let value = params[key] || '';
    url += `&${enc(key)}=${enc(value)}`;
  }
  url += `&${enc(options.param)}=${enc(callbackName)}`;
  url = url.replace('?&', '?');

  // insert the script to DOM and here we go!
  target = document.getElementsByTagName('script')[0] || document.head;
  script = document.createElement('script');
  script.src = url;
  target.parentNode.appendChild(script, target);

  /**
   * returns a Promise to tell user if this request succeeded or failed
   * as less code as possible here for clarity
   */
  return new Promise((resolve, reject) => {
    /**
     * bind a function on window[id] so the scripts arrived, this function could be triggered
     * data would be a JSON object from the server
     */
    window[callbackName] = function(data) {
      clean();
      resolve(data);
    };

    if (options.timeout) {
      timer = setTimeout(() => {
        clean();
        reject('[ERROR] Time out.');
      }, options.timeout);
    }
  });
}

module.exports = pjsonp;
