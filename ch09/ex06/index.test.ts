import { TypeMap } from "./index.ts";

describe("TypeMap test", () => {
  it("コンストラクタで初期値を設定する", () => {
    const map = new TypeMap("string", "string", [
      ["one", "1"],
      ["two", "2"],
    ]);
    expect(map.get("one")).toBe("1");
    expect(map.get("two")).toBe("2");
  });

  it("コンストラクタで不正な型の初期値を設定するとエラーをスローする", () => {
    expect(
      () =>
        new TypeMap("string", "string", [
          ["one", "1"],
          ["two", 2 as any],
        ]),
    ).toThrow("Wrong type for entry [two, 2]");
    expect(
      () =>
        new TypeMap("string", "string", [
          ["one", "1"],
          [2 as any, "2"],
        ]),
    ).toThrow("Wrong type for entry [2, 2]");
  });

  it("setメソッドで新しいキーと値を設定する", () => {
    const map = new TypeMap("string", "string");
    map.set("three", "3");
    expect(map).toBeInstanceOf(TypeMap);
  });

  it("setメソッドで不正な型のキーを設定するとエラーをスローする", () => {
    const map = new TypeMap("string", "string");
    expect(() => map.set(3 as any, "3")).toThrow("3 is not of type string");
  });

  it("setメソッドで不正な型の値を設定するとエラーをスローする", () => {
    const map = new TypeMap("string", "string");
    expect(() => map.set("three", 3 as any)).toThrow("3 is not of type string");
  });
});