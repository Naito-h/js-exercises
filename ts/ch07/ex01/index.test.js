import { addMatrix, mulMatrix } from "./index.ts";

test("addMatrix", () => {
  expect(addMatrix([[1, 2], [3, 4]], [[5, 6], [7, 8]])).toEqual([
    [6, 8],
    [10, 12],
  ]);
});

test("mulMatrix", () => {
  expect(mulMatrix([[1, 2], [3, 4]], [[5, 6], [7, 8]])).toEqual([
    [19, 22],
    [43, 50],
  ]);
});