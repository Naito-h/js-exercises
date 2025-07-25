import { getProperties } from "./index.ts";

const obj1 = { a: 1, b: 2, c: 3 };
Object.defineProperty(obj1, "newProperty", {
    value: "value",
    enumerable: false,
});
const obj2 = { a: 1, b: 2, c: 3, [Symbol("a")]: 4, d: 4 };
const obj3 = Object.create(obj2);
obj3.f = 5;

test.each([
    { obj: obj1, actual: getProperties(obj1), expected: ["a", "b", "c", "newProperty"] },
    { obj: obj2, actual: getProperties(obj2), expected: ["a", "b", "c", "d", Symbol("a")] },
    { obj: obj3, actual: getProperties(obj3), expected: ["f", "a", "b", "c", "d"] },
    { obj: {}, actual: getProperties({}), expected: [] },
    { obj: Object.create(obj1), actual: getProperties(Object.create(obj1)), expected: ["a", "b", "c"] },
    { obj: Object.create(obj2), actual: getProperties(Object.create(obj2)), expected: ["a", "b", "c", "d"] },
    { obj: Object.create(obj3), actual: getProperties(Object.create(obj3)), expected: ["f", "a", "b", "c", "d"] },
])(
  "getProperties($obj) => actual: $actual, expected: $expected",
  ({ actual, expected }) => {
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
  }
);