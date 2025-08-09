export const f = (o: { [key: string]: number }): object => {
    const newObj: { [key: string]: number } = {};
    for (let p in o) {
        if (o[p] % 2 === 0) {
            newObj[p] = o[p];
        }
    }
    return newObj;
};

const o = { x: 1, y: 2, z: 3 };
console.log(f(o)); // { y: 2 }
console.log(o); // { x: 1, y: 2, z: 3 } (元のオブジェクトは変更されていない)