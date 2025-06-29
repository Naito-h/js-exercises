import { fib_while, fib_do_while, fib_for } from "./index.ts";

const result = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

describe("フィボナッチ数列", () => {
    test("while", () => {
        expect(fib_while()).toEqual(result);
    });
    test("do-while", () => {
        expect(fib_do_while()).toEqual(result);
    });
    test("for", () => {
        expect(fib_for()).toEqual(result);
    });
});