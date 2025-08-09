import { toEscape1, toEscape2 } from "./index.ts";

const cases = [
  { input: "\0", expected: "\\0" },
  { input: "\b", expected: "\\b" },
  { input: "\t", expected: "\\t" },
  { input: "\n", expected: "\\n" },
  { input: "\v", expected: "\\v" },
  { input: "\f", expected: "\\f" },
  { input: "\r", expected: "\\r" },
  { input: "\"", expected: "\\\"" },
  { input: "\'", expected: "\\\'" },
  { input: "\\", expected: "\\\\" },
  { input: "abc", expected: "abc" },
  { input: "\0\t\n", expected: "\\0\\t\\n" },
  { input: "a\nb", expected: "a\\nb" },
];

describe("エスケープシーケンスに変換", () => {
  describe("if-else", () => {
    test.each(cases)("%s", ({ input, expected }) => {
      expect(toEscape1(input)).toBe(expected);
    });
  });

  describe("switch", () => {
    test.each(cases)("%s", ({ input, expected }) => {
      expect(toEscape2(input)).toBe(expected);
    });
  });
});