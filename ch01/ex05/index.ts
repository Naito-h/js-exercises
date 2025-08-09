export function abs(x: number): number {
  if (x >= 0) {
    return x;
  } else {
    return -x;
  }
}

export function sum(array: number[]): number {
  let sum = 0;
  for (let x of array) {
    sum += x;
  }
  return sum;
}

export function factorial(n: number): number {
  let product = 1;
  while (n > 1) {
    product *= n;
    n--;
  }
  return product;
}
