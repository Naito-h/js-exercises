import { push, pop, shift, unshift, sort } from "./index.ts";

const arr = [1, 2, 3, 4, 5];

test("pop", () => {
  expect(pop(arr)).toStrictEqual([1, 2, 3, 4]);
  expect(pop([])).toStrictEqual([]);
});

test("push", () => {
  expect(push([], 1)).toStrictEqual([1]);
  expect(push([1, 2, 3], 4)).toStrictEqual([1, 2, 3, 4]);
});

test("shift", () => {
  expect(shift(arr)).toStrictEqual([2, 3, 4, 5]);
  expect(shift([])).toStrictEqual([]);
});

test("unshift", () => {
  expect(unshift([], 1)).toStrictEqual([1]);
  expect(unshift([2, 3, 4], 1)).toStrictEqual([1, 2, 3, 4]);
});

test("sort", () => {
  expect(sort([3, 1, 2])).toStrictEqual([1, 2, 3]);
  expect(sort([1, 2, 3, 4, 5], (a, b) => b - a)).toStrictEqual([5, 4, 3, 2, 1   ]);
  expect(sort([])).toStrictEqual([]);
  expect(sort(["b", "a", "c"])).toStrictEqual(["a", "b", "c"]);
  expect(() => {
    sort();
  }).toThrowError();
});
