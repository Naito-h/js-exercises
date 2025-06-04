import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = "egg"; // ここを変更
  const y = ["e", "g", "g"]; // ここを変更

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
