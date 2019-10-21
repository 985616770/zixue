function getAvg() {
  if (!arguments.length) return;
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum / arguments.length;
}

console.log(getAvg(1, 2, 3, 4, 5));
