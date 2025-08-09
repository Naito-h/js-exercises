function fizzbuzz(n: number) {
    Array.from({ length: n }, (_, i) => i + 1)
        .map((i) => [
            i % 3 === 0 ? 'Fizz' : "",
            i % 5 === 0 ? 'Buzz' : "",
        ].join('') || i.toString())
        .forEach(num => console.log(num));
}

fizzbuzz(100);

function sumOfSquaredDifference(f: number[], g: number[]): number {
  let result = 0;
  f.map((value, i) => {
    const diff = value - g[i];
    result += diff ** 2;
  });
  return result;
}

console.log(sumOfSquaredDifference([1, 2, 3], [4, 5, 6])); // Output: 27
console.log(sumOfSquaredDifference([10, 20, 30], [1, 2, 3])); // Output: 1400
console.log(sumOfSquaredDifference([1, 2, 3], [1, 2, 3])); // Output: 0

function sumOfEvensIsLargerThan42(array: number[]): boolean {
  let sum = 0;
  array.filter(num => num % 2 === 0)
       .forEach(num => sum += num);
  return sum >= 42;
}

console.log(sumOfEvensIsLargerThan42([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // Output: false
console.log(sumOfEvensIsLargerThan42([20, 22, 24])); // Output: true
