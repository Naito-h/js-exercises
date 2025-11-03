export function fibonacciSequence(n: number): IterableIterator<number> {
    let x = 0, y = 1;
    let count = 0;
    return {
        [Symbol.iterator]() { return this; },
        next() {
            if (count < n) {
                const value = y;
                [x, y] = [y, x + y];
                count++;
                return { value, done: false };
            } else {
                return { value: undefined, done: true };
            }
        }
    }
}

const fibIter = fibonacciSequence(10);
for (const num of fibIter) {
    console.log(num);
}