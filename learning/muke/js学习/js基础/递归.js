function S(n) {
  if (n == 1) {
    return 1;
  } else {
    return n + S(n - 1);
  }
}
S(20);
console.log(S(5));
/* 
S(5) 5 + S(4)
S(4) 4 + S(3)
S(3) 3 + S(2)
S(2) 2 + S(1)
S(1) 1

*/
