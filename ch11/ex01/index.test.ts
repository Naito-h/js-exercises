import { TypeMap } from "./index.ts";

class Foo {}

describe('TypeMap tests', () => {
  test('Stringの場合', () => {
    const typeMap = new TypeMap();
    expect(() => typeMap.set(String, "string")).not.toThrow();
    expect(typeMap.get(String)).toBe("string");
  });

  test('Numberの場合', () => {
    const typeMap = new TypeMap();
    expect(() => typeMap.set(Number, 123)).not.toThrow();
    expect(typeMap.get(Number)).toBe(123);
  });

  test('Booleanの場合', () => {
    const typeMap = new TypeMap();
    expect(() => typeMap.set(Boolean, true)).not.toThrow();
    expect(typeMap.get(Boolean)).toBe(true);
  });

  test('クラスの場合', () => {
    const typeMap = new TypeMap();
    const foo = new Foo();
    expect(() => typeMap.set(Foo, foo)).not.toThrow();
    expect(typeMap.get(Foo)).toBe(foo);
  });

  test('Dateの場合', () => {
    const typeMap = new TypeMap();
    const date = new Date();
    expect(() => typeMap.set(Date, date)).not.toThrow();
    expect(typeMap.get(Date)).toBe(date);
  });

  test('型が異なる場合', () => {
    const typeMap = new TypeMap();
    expect(() => typeMap.set(String, 123)).toThrow(Error);
    expect(() => typeMap.set(Number, "text")).toThrow(Error);
    expect(() => typeMap.set(Boolean, "text")).toThrow(Error);
    expect(() => typeMap.set(Date, "not a date")).toThrow(Error);
    expect(() => typeMap.set(Foo, {})).toThrow(Error);
  });
});

