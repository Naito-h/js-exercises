import { resetCounter } from "./index.ts";

describe("resetCounter", () => {
    test("カウントのみ", () => {
        const counter = resetCounter();
        expect(counter.next().value).toBe(1);
        expect(counter.next().value).toBe(2);
        expect(counter.next().value).toBe(3);
        expect(counter.next().value).toBe(4);
        expect(counter.next().value).toBe(5);
        expect(counter.next().value).toBe(6);
    });
    test("throwでリセット", () => {
        const counter = resetCounter();
        expect(counter.next().value).toBe(1);
        expect(counter.next().value).toBe(2);
        expect(counter.next().value).toBe(3);
        counter.throw(new Error("reset"));
        expect(counter.next().value).toBe(1);
        expect(counter.next().value).toBe(2);
        expect(counter.next().value).toBe(3);
    });
});
