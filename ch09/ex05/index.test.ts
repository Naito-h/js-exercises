import { instanceOf } from "./index.ts";

describe("instanceOf function test", () => {
  // クラスの定義
  class A {}
  class B extends A {}
  class C extends B {}
  class D {}

  // インスタンスの生成
  const a = new A();
  const b = new B();
  const c = new C();
  const d = new D();

  // Aのインスタンス
  it("Aのインスタンス", () => {
    expect(instanceOf(a, A)).toBe(true);
    expect(instanceOf(a, B)).toBe(false);
    expect(instanceOf(a, C)).toBe(false);
    expect(instanceOf(a, D)).toBe(false);
  });

  // Bのインスタンス
  it("Bのインスタンス", () => {
    expect(instanceOf(b, A)).toBe(true);
    expect(instanceOf(b, B)).toBe(true);
    expect(instanceOf(b, C)).toBe(false);
    expect(instanceOf(b, D)).toBe(false);
  });

  // Cのインスタンス
  it("Cのインスタンス", () => {
    expect(instanceOf(c, A)).toBe(true);
    expect(instanceOf(c, B)).toBe(true);
    expect(instanceOf(c, C)).toBe(true);
    expect(instanceOf(c, D)).toBe(false);
  });

  // Dのインスタンス
  it("Dのインスタンス", () => {
    expect(instanceOf(d, A)).toBe(false);
    expect(instanceOf(d, B)).toBe(false);
    expect(instanceOf(d, C)).toBe(false);
    expect(instanceOf(d, D)).toBe(true);
  });
});