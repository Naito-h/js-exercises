export const sum = (n: number[]): number => {
    if (n === undefined || n.length === 0) {
        return 0;
    }
    return n.reduce((x, y) => x + y, 0);
}

export const join = (n: string[], separator: string|null = ","): string => {
    if (!Array.isArray(n)) {
        throw new Error;
    }
    return n.reduce((x, y, index) => x + (index === 0 ? '' : separator) + (y ?? ''), '');
}

export const reverse = (n: string[]): string[] => {
    return n.reduce<string[]>((x, y) => [y, ...x], []);
}

export const every = (n: number[], predicate: (value: number, index: number, arr: number[]) => boolean): boolean => {
    return n.reduce((acc, curr, index, arr) => {
        return acc && predicate(curr, index, arr);
    }, true);
}

export const some = (n: number[], predicate: (value: number, index: number, arr: number[]) => boolean): boolean => {
    return n.reduce((acc, curr, index, arr) => acc || predicate(curr, index, arr), false);
}

console.log(sum([1, 2, 3, 4])); // 10
console.log(join(['a', 'b', 'c'])); // a,b,c
console.log(join(['1', '2', '3'], null)); // 1null2null3