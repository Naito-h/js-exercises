// while
export const fib_while = (): number[] => {
    const res: number[] = [];
    let a = 0;
    let b = 1;
    let c = 0;
    let i = 0;
    while (i < 10) {
        c = a + b;
        a = b;
        b = c;
        i++;
        res.push(a);
    }
    return res;
};

// do-while
export const fib_do_while = (): number[] => {
    const res: number[] = [];
    let a = 0;
    let b = 1;
    let c = 0;
    let i = 0;
    do {
        c = a + b;
        a = b;
        b = c;
        i++;
        res.push(a);
    } while (i < 10);
    return res;
};

// for
export const fib_for = (): number[] => {
    const res: number[] = [];
    let a = 0;
    let b = 1;
    let c = 0;
    for (let i = 0; i < 10; i++) {
        c = a + b;
        a = b;
        b = c;
        res.push(a);
    }
    return res;
};
