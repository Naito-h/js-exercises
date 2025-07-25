export const sum = (n: number[]): number => {
    return n.reduce((x, y) => x + y, 0);
}

export const join = (n: string[]): string => {
    return n.reduce ((x, y) => `${x}${y}`, '');
}

export const reverse = (n: string[]): string[] => {
    return n.reduce<string[]>((x, y) => [y, ...x], []);
}

export const every = (n: number[], predicate: (value: number) => boolean): boolean => {
    return n.reduce((acc, curr) => {
        if (acc === false) {
            return false;
        }
        return predicate(curr);
    }, true);
}

export const some = (n: number[], predicate: (value: number) => boolean): boolean => {
    return n.reduce((x, y) => x || predicate(y), false);
}