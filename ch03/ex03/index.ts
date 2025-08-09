const isEqual = (a: number, b: number): boolean => {
    return Math.abs(a - b) < 10e-10;
};

console.log("(0.3 - 0.2, 0.1)" + isEqual(0.3 - 0.2, 0.1)); // true
console.log("(0.2 - 0.1, 0.1)" + isEqual(0.2 - 0.1, 0.1)); // true