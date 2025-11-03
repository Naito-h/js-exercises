import { primes } from "./index.ts";

describe("primes", () => {
    test("最初の10個の素数を生成する", () => {
        const expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        const gen = primes();
        const result: number[] = [];
        for (let i = 0; i < 10; i++) {
            result.push(gen.next().value);
        }
        expect(result).toEqual(expected);
    });
});
