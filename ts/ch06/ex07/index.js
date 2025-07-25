export const assign = (target, ...sources) => {
    for (let source of sources) {
        if (typeof source !== "object" || source === null) {
            continue;
        }
        for (let source2 of source) {
            if (typeof source2 !== "object" || source2 === null) {
                continue;
            }
            for (let key of Object.keys(source2)) {
                if (typeof source2[key] !== "object") {
                    target[key] = source2[key];
                }
            }
        }
    }
    return target;
}

const obj1 = { a: 1 };
const obj2 = { b: 2, c: 3 };
const obj3 = { d: 4, e: 5, a: 6 };
console.log(assign(obj1, obj2, obj3)); // => { a: 6, b: 2, c: 3, d: 4, e: 5 }
console.log(assign({ foo: "foo", hello: "world" }, [
    123,
    true,
    ["aa", "bb", "cc"],
    null,
    undefined,
  ]))
console.log(Object.assign({ foo: "foo", hello: "world" },
    123,
    true,
    ["aa", "bb", "cc"],
    null,
    undefined,
))