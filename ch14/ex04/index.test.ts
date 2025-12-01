import { Hiragana } from "./index.ts";

describe("Hiragana", () => {
    test("ひらがな1文字", () => {
        const a = new Hiragana("あ");
        expect(a.char).toBe("あ");
        expect(a.code).toBe("あ".charCodeAt(0));
    });
    test("ひらがな以外の文字", () => {
        expect(() => new Hiragana("A")).toThrow("ひらがなを指定してください。");
        expect(() => new Hiragana("ア")).toThrow("ひらがなを指定してください。");
        expect(() => new Hiragana("漢")).toThrow("ひらがなを指定してください。");
        expect(() => new Hiragana("1")).toThrow("ひらがなを指定してください。");
    });
    test("1文字以外", () => {
        expect(() => new Hiragana("")).toThrow("1文字のみ指定してください。");
        expect(() => new Hiragana("あい")).toThrow("1文字のみ指定してください。");
        expect(() => new Hiragana("あいう")).toThrow("1文字のみ指定してください。");
    });
});