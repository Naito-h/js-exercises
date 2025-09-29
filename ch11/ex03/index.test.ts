import { littleEndianToBigEndian, bigEndianToLittleEndian } from "./index.ts";

describe("littleEndianToBigEndian Test", () => {
    test("配列が1つの要素を持つ場合", () => {
        const input = new Uint32Array([0x12345678]);
        const expected = new Uint32Array([0x78563412]);
        const result = littleEndianToBigEndian(input);
        expect(result).toEqual(expected);
    });

    test("配列が2つの要素を持つ場合", () => {
        const input = new Uint32Array([0x12345678, 0x9abcdef0]);
        const expected = new Uint32Array([0x78563412, 0xf0debc9a]);
        const result = littleEndianToBigEndian(input);
        expect(result).toEqual(expected);
    });

    test("空の配列の場合", () => {
        const input = new Uint32Array([]);
        const expected = new Uint32Array([]);
        const result = littleEndianToBigEndian(input);
        expect(result).toEqual(expected);
    });
});

describe("bigEndianToLittleEndian Test", () => {
    test("配列が1つの要素を持つ場合", () => {
        const input = new Uint32Array([0x78563412]);
        const expected = new Uint32Array([0x12345678]);
        const result = bigEndianToLittleEndian(input);
        expect(result).toEqual(expected);
    });

    test("配列が2つの要素を持つ場合", () => {
        const input = new Uint32Array([0x78563412, 0xf0debc9a]);
        const expected = new Uint32Array([0x12345678, 0x9abcdef0]);
        const result = bigEndianToLittleEndian(input);
        expect(result).toEqual(expected);
    });
    
    test("空の配列の場合", () => {
        const input = new Uint32Array([]);
        const expected = new Uint32Array([]);
        const result = bigEndianToLittleEndian(input);
        expect(result).toEqual(expected);
    });
});
