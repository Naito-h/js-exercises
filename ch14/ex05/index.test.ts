import { template } from "./index.ts";

describe("template Test", () => {
    test("テスト", () => {
        expect(template``).toBe("");
        expect(template`test`).toBe("test");
        expect(template`Hello, ${"A"}`).toBe("Hello, string");
        expect(template`${1} ${null} ${() => {}}`).toBe("number object function");
        expect(template`type of 'A' is ${"A"}`).toBe("type of 'A' is string");
        expect(template`left, ${true}, middle, ${undefined}, right`).toBe("left, boolean, middle, undefined, right");
    });
});