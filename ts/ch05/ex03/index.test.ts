import { is31_if, is31_switch } from "./index.ts";

const cases = [
  { input: "Jan", expected: true },
  { input: "Feb", expected: false },
  { input: "Mar", expected: true },
  { input: "Apr", expected: false },
  { input: "May", expected: true },
  { input: "Jun", expected: false },
  { input: "Jul", expected: true },
  { input: "Aug", expected: true },
  { input: "Sep", expected: false },
  { input: "Oct", expected: true },
  { input: "Nov", expected: false },
  { input: "Dec", expected: true },
];

describe("31日あるかどうか", () => {
  describe("if-else", () => {
    test.each(cases)("%s", ({ input, expected }) => {
      expect(is31_if(input)).toBe(expected);
    });
  });

  describe("switch", () => {
    test.each(cases)("%s", ({ input, expected }) => {
      expect(is31_switch(input)).toBe(expected);
    });
  });
});