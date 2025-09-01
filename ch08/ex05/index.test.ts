import { sequenceToObject } from "./index.ts";

describe('sequenceToObject Test', () => {
  test('通常ケース', () => {
    expect(sequenceToObject("name", "Alice", "age", 30)).toEqual({ name: 'Alice', age: 30 });
    expect(sequenceToObject("city", "Tokyo", "country", "Japan")).toEqual({ city: 'Tokyo', country: 'Japan' });
  });
  test('空の引数', () => {
    expect(sequenceToObject()).toEqual({});
    });
  test('キーに空文字を使用', () => {
    expect(sequenceToObject("", "value")).toEqual({ "": "value" });
    expect(sequenceToObject("key", "")).toEqual({ key: "" });
  });
  test('キーが文字列以外', () => {
    expect(() => sequenceToObject("key1", "value1", 42, "value2")).toThrowError("キーは文字列でなければなりません");
  });
  test('引数が奇数個', () => {
    expect(() => sequenceToObject("key1", "value1", "key2")).toThrowError("引数は偶数個でなければなりません");
  });
});
