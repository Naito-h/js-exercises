import { readLines } from "./index.ts";

describe("readLines", () => {
    test("ファイルの各行を読み込む", () => {
        const filePath = './ch12/ex05/index.txt';
        const expected = [
            "aaa",
            "bbb",
            "ccc",
            "ddd",
            "eee"
        ];
        const result = [...readLines(filePath)];
        expect(result).toEqual(expected);
    });
});
