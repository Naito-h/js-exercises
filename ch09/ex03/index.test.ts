import { PositiveNumber } from "./index.ts";

describe("PositiveNumber test", () => {
  it("コンストラクタで値を設定する", () => {
    const num = new PositiveNumber(42);
    expect(num.getX()).toBe(42);
  });

  it("非正の数値に対してエラーをスローする", () => {
    expect(() => new PositiveNumber(0)).toThrow("require : x > 0");
    expect(() => new PositiveNumber(-1)).toThrow("require : x > 0");
  });

  it("セッターで新しい正の数値を設定する", () => {
    const num = new PositiveNumber(10);
    num.setX(20);
    expect(num.getX()).toBe(20);
  });

  it("非正の数値を設定しようとしたときにエラーをスローする", () => {
    const num = new PositiveNumber(10);
    expect(() => num.setX(0)).toThrow("require : x > 0");
    expect(() => num.setX(-5)).toThrow("require : x > 0");
  });

  it("プライベートフィールドに直接アクセスできない", () => {
    const num = new PositiveNumber(10);
    expect((num as any).x).toBeUndefined(); // プライベートフィールドはクラス外部からアクセスできない
    (num as any).x = 5;
    expect(num.getX()).toBe(10); // 元の値のまま変わらない
  });
});