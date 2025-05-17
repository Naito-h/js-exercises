const fib = (n: number): number => {
  let fib = 0;
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) {
    a = b;
    b = fib;
    fib = a + b;
  }
  return fib;
};

console.log(fib(5)); // 5
console.log(fib(75)); // 2111485077978050
