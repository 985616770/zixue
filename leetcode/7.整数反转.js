/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let c = x < 0 ? -x : x;
  let a = 0;
  while (c > 9) {
    a = a * 10 + (c % 10) * 10;
    c = parseInt(c / 10);
  }
  a += c;

  if (a < -(2 ** 31) || a > 2 ** 31 - 1) return 0;
  return x < 0 ? -a : a;
};
// @lc code=end
