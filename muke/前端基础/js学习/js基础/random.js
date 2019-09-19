function randomNum(n, m) {
  var set = m - n + 1;
  return Math.floor(Math.random() * set + n);
}
const newLocal = randomNum(3, 20);
console.log(newLocal);
