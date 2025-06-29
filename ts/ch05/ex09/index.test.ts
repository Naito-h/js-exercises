import { parseJson } from "./index.ts";

describe("JSONパース", () => {
    test("正常なJSON", () => {
        expect(parseJson('{"name": "John", "age": 30}')).toEqual({ success: true, data: { name: 'John', age: 30 } });
    });

    test("不正なJSON", () => {
        expect(parseJson('{"name": "John", "age": 30')).toEqual({ success: false, error: 'Unexpected end of JSON input' });
    });

    test("空文字列", () => {
        expect(parseJson('')).toEqual({ success: false, error: 'Unexpected end of JSON input' });
    });

    test("文字列", () => {
        expect(parseJson('"Hello, world!"')).toEqual({ success: true, data: "Hello, world!" });
    });

});