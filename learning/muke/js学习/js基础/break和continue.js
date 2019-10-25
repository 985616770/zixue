// for (let i = 0; i <= 50; i++) {
//   if (i % 20 == 0 || i % 30 == 0) {
//     continue;
//   } else if(i % 5  == 0){
//     console.log(i);
//   }
// }

for (let i = 0; i <= 50; i += 5) {
  if (i == 20 || i == 30) {
    continue;
  }
  console.log(i);
}
