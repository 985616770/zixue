function getMessage() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve('Hello asynchronous world!');
    }, 0);
  });
}

console.log(getMessage());
async function A() {
  let b = await getMessage();
  console.log(b);
}
A();
