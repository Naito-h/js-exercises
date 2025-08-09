import { abs, sum, factorial } from "./index.ts";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("returns same value when positive value given", () => {
      expect(sum([10, 20])).toBe(30);
    });

    it("returns negated value when negative value given", () => {
      expect(sum([-10, -20])).toBe(-30);
    });

    it("returns zero value when zero given", () => {
      expect(sum([0, 0])).toBe(0);
    });
  });

  describe("factorial", () => {
    it("returns 1 when 0 given", () => {
      expect(factorial(0)).toBe(1);
    });

    it("returns 1 when 1 given", () => {
      expect(factorial(1)).toBe(1);
    });

    it("returns 120 when 5 given", () => {
      expect(factorial(5)).toBe(120);
    });
  });
});
