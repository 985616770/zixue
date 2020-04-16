function formatNum(num){
  return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g,function ($1,$2){
    return $2 + ','
  })
}
console.log(formatNum(123400000.111));
