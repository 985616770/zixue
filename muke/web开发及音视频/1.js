var str = 'ssfdddddasdfasdfer';
var obj = {};

for (let i = 0; i < str.length; i++) {
  const key = str[i];
  if (!obj[key]) {
    obj[key] = 1;
  } else {
    obj[key]++;
  }
}

var max = -1;
var max_key = '';
for (let key in obj) {
  if (max < obj[key]) {
    max = obj[key];
    max_key = key;
  }
}
console.log(`max:${max} ,max_key: ${max_key}`);
console.log(obj);

