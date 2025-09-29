import { cache } from "./index.ts";

function slowFn(obj: { a: number }): number {
  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += Math.sqrt(i) * Math.sin(i);
  }
  return total;
}

describe("cache", () => {
    test("キャッシュ機能のテスト", () => {
        const cachedSlowFn = cache(slowFn);

        const object = { a: 1 };

        const start1 = Date.now();
        const result1 = cachedSlowFn(object);
        const duration1 = Date.now() - start1;
        expect(typeof result1).toBe("number");
        expect(duration1).toBeGreaterThan(0); // 最初の呼び出しは遅い
        console.log(`First call duration: ${duration1}ms`);

        const start2 = Date.now();
        const result2 = cachedSlowFn(object);
        const duration2 = Date.now() - start2;
        expect(result2).toBe(result1);
        expect(duration2).toBeLessThan(10); // 2回目の呼び出しは速い
        console.log(`Second call duration: ${duration2}ms`);
    });
});
