function getSuffix(str) {
  var potIndex = str.indexOf('.');
  return str.slice(potIndex);
}

console.log(getSuffix('asd.23'));
