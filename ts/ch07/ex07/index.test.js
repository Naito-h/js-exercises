import { bubbleSort } from "./index.ts";

test("bubbleSort", () => {
  expect(bubbleSort([3, 1, 2])).toStrictEqual([1, 2, 3]);
  expect(bubbleSort([5, 2, 3, 4, 5])).toStrictEqual([2, 3, 4, 5, 5]);
  expect(bubbleSort([])).toStrictEqual([]);
  expect(bubbleSort(["b", "a", "c"])).toStrictEqual(["a", "b", "c"]);
  expect(() => {
    bubbleSort();
  }).toThrowError();
});