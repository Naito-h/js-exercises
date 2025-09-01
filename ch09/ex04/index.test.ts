import { Warrior, MagicWarrior, Warrior2, MagicWarrior2 } from "./index.ts";

describe("classを使った記法のテスト", () => {
  it("Warriorのattackメソッドが正しい値を返す", () => {
    const warrior = new Warrior(10);
    expect(warrior.attack()).toBe(20);
  });

  it("MagicWarriorのattackメソッドが正しい値を返す", () => {
    const magicWarrior = new MagicWarrior(10, 5);
    expect(magicWarrior.attack()).toBe(25);
  });
});

describe("prototypeを使った記法のテスト", () => {
  it("Warrior2のattackメソッドが正しい値を返す", () => {
    const warrior2 = new (Warrior2 as any)(10);
    expect(warrior2.attack()).toBe(20);
  });

  it("MagicWarrior2のattackメソッドが正しい値を返す", () => {
    const magicWarrior2 = new (MagicWarrior2 as any)(10, 5);
    expect(magicWarrior2.attack()).toBe(25);
  });
});