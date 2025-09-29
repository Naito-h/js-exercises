import { sortJapanese, toJapaneseDate } from "./index.ts";

describe("sortJapanese Test", () => {
  test("日本語の文字列を正しくソートできること", () => {
    const input = ["りんご", "バナナ", "みかん", "あんず"];
    const expected = ["あんず", "バナナ", "みかん", "りんご"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  test("大文字・小文字を区別せずにソートできること", () => {
    const input = ["あっぷる", "りんご", "あつふる", "バナナ", "みかん"];
    const expected = ["あっぷる", "あつふる", "バナナ", "みかん", "りんご"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  test("濁点・半濁点を区別せずにソートできること", () => {
    const input = ["ぱんだ", "みかん", "はんだ", "りんご", "ばんだな", "バナナ"];
    const expected = ["バナナ", "ぱんだ", "はんだ", "ばんだな", "みかん", "りんご"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  test("空の配列を渡した場合、空の配列を返すこと", () => {
    const input: string[] = [];
    const expected: string[] = [];
    expect(sortJapanese(input)).toEqual(expected);
  });
});

const testDates = [
  { input: new Date("2023-12-31"), expected: "令和5年12月31日" },
  { input: new Date("2024-02-29"), expected: "令和6年2月29日" }, // うるう年
  { input: new Date("2022-07-04"), expected: "令和4年7月4日" },
];

describe("toJapaneseDate Test", () => {
    testDates.forEach(({ input, expected }) => {
        test(`${input} "${expected}"`, () => {
            expect(toJapaneseDate(input)).toEqual(expected);
        });
    });

});
