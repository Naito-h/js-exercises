const add = (o1: { p1: number; p2: number }, o2: { p1: number; p2: number }) => {
    const res = { p1: o1.p1 + o2.p1, p2: o1.p2 + o2.p2 };
    return res;
};

const sub = (o1: { p1: number; p2: number }, o2: { p1: number; p2: number }) => {
    const res = { p1: o1.p1 - o2.p1, p2: o1.p2 - o2.p2 };
    return res;
};

const mul = (o1: { p1: number; p2: number }, o2: { p1: number; p2: number }) => {
    const res = { p1: o1.p1 * o2.p1 - o1.p2 * o2.p2, p2: o1.p1 * o2.p2 + o1.p2 * o2.p1 };
    return res;
};

const div = (o1: { p1: number; p2: number }, o2: { p1: number; p2: number }) => {
    const denom = o2.p1 * o2.p1 + o2.p2 * o2.p2;
    const res = {
        p1: (o1.p1 * o2.p1 + o1.p2 * o2.p2) / denom,
        p2: (o1.p2 * o2.p1 - o1.p1 * o2.p2) / denom
    };
    return res;
};

const display = (o: { p1: number; p2: number }) => {
    return `p1: ${o.p1}, p2: ${o.p2}`;
};

const o1 = {
    p1 : 1,
    p2 : 2,
};

const o2 = {
    p1 : 3,
    p2 : 4,
};

console.log(`add: ${display(add(o1, o2))}`); // { p1: 4, p2: 6 }
console.log(`sub: ${display(sub(o1, o2))}`); // { p1: -2, p2: -2 }
console.log(`mul: ${display(mul(o1, o2))}`); // { p1: -5, p2: 10 }
console.log(`div: ${display(div(o1, o2))}`); // { p1: 0.44, p2: 0.08 }
