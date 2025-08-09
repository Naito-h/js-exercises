import { f } from "./index.ts";

describe("オブジェクトのフィルタリング", () => {
    test("偶数のフィルタリング", () => {
        expect(f({ x: 1, y: 2, z: 3 })).toEqual({ y: 2 });
    });

    test("全て偶数", () => {
        expect(f({ a: 2, b: 4, c: 6 })).toEqual({ a: 2, b: 4, c: 6 });
    });

    test("全て奇数", () => {
        expect(f({ a: 1, b: 3, c: 5 })).toEqual({});
    });

    test("空オブジェクト", () => {
        expect(f({})).toEqual({});
    });

    test("値が0のみ", () => {
        expect(f({ a: 0 })).toEqual({ a: 0 });
    });
});