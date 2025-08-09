const bitCount = (n: number): number => {
    let count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
};

console.log(bitCount(0b111)); // 3
console.log(bitCount(0b1111111111111111111111111111111)); // 31