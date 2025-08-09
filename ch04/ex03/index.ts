const sub = (a: number, b: number): number => {
    while (b !== 0) {
        const borrow = (~a) & b;
        a ^= b;
        b = borrow << 1;
    }
    return a;
};

const a = 8; // 00000000000000000000000000001000
const b = 3; // 00000000000000000000000000000011

console.log(sub(a, b)); // 5: 00000000000000000000000000000101
