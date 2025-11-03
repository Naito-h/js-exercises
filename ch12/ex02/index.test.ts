import { fibonacciSequence } from "./index.ts";

describe("fibonacciSequence", () => {
    test("10の場合", () => {
        const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        const result = [...fibonacciSequence(10)];
        expect(result).toEqual(expected);
    });
    test("0の場合", () => {
        const expected: number[] = [];
        const result = [...fibonacciSequence(0)];
        expect(result).toEqual(expected);
    });
});
