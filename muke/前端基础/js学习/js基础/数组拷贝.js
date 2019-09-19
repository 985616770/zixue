var a = [1, 2, 3],
  b;

b = a.slice()
console.log(b);

var c = a;
console.log(c);
console.log(a);
console.log(c);
console.log(b);

var d = a.concat([]);

var f =[];

for (let i = 0; i < a.length; i++) {
  f.push(a[i])
}
console.log(d.length);
console.log(f);