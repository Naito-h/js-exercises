export const getProperties = (obj: object): (string|symbol)[] => {
    let res = Reflect.ownKeys(obj); // すべての独自プロパティを取得
    let proto = Object.getPrototypeOf(obj);
    while (proto) {
        Object.keys(proto).forEach(name => {
            if (!res.includes(name)) {
                res.push(name);
            }
        });
        proto = Object.getPrototypeOf(proto);
    }
    return res;
};

const obj1 = { a: 1, b: 2, c: 3 };
Object.defineProperty(obj1, "newProperty", {
    value: "value",
    enumerable: false,
});
const obj2 = { a: 1, b: 2, c: 3, [Symbol("a")]: 4, d: 4 };
const obj3 = Object.create(obj2);
obj3.f = 5;
console.log(getProperties(obj1)); // => ['a', 'b', 'c', 'newProperty']
console.log(getProperties(obj2)); // => ['a', 'b', 'c', 'd', Symbol(a)]
console.log(getProperties(obj3)); // => ['f', 'a', 'b', 'c', 'd']