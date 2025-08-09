// symbol()の場合
const s1 = Symbol('name');
const s2 = Symbol('name');
console.log("s1: " + s1.toString());
console.log("s2: " + s2.toString());

const o1: {[key: symbol]: number} = {
    [s1]: 1,
    [s2]: 2
};
console.log("o1[s1]: " + o1[s1]);
console.log("o1[s2]: " + o1[s2]);

// // Symbol.for()の場合
const s3 = Symbol.for('name');
const s4 = Symbol.for('name');
console.log("s3: " + s3.toString());
console.log("s4: " + s4.toString());

const o2: {[key: symbol]: number} = {
    [s3]: 1,
    [s4]: 2
};
console.log("o2[s3]: " + o2[s3]);
console.log("o2[s4]: " + o2[s4]);
