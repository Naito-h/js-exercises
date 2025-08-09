export const push = (arr: any[], item: any): any[] => {
    const newArr = [...arr];
    newArr.push(item);
    return newArr;
};

export const pop = (arr: any[]): any[] => {
    const newArr = [...arr];
    newArr.pop();
    return newArr;
};

export const shift = (arr:  any[]): any[] => {
    const newArr = [...arr];
    newArr.shift();
    return newArr;
};

export const unshift = (arr: any[], item: any): any[] => {
    const newArr = [...arr];
    newArr.unshift(item);
    return newArr;
};

export const sort = (arr: any[], compareFn?: (a: any, b: any) => number): any[] => {
    const newArr = [...arr];
    newArr.sort(compareFn);
    return newArr;
};

const seq = [1, 2, 3, 4, 5];

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]
