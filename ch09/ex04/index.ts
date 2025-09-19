// classを使った記法
// 戦士クラス
export class Warrior {
    #atk: number;
    constructor(atk: number) {
        this.#atk = atk;
    }
    attack(): number {
        return this.#atk * 2;
    }
}

// 魔法戦士クラス
export class MagicWarrior extends Warrior {
    #mgc: number;
    constructor(atk: number, mgc: number) {
        super(atk);
        this.#mgc = mgc;
    }
    attack(): number {
        return super.attack() + this.#mgc;
    }
}

console.log("=== classを使った記法 ===");
const warrior = new (Warrior as any)(10);
console.log("Warrior attack:", warrior.attack()); // 20
const magicWarrior = new (MagicWarrior as any)(10, 5);
console.log("MagicWarrior attack:", magicWarrior.attack()); // 25


// prototypeを使った記法
// 戦士クラス
export function Warrior2(this: any, atk: number): void {
    this.atk = atk;
};

Warrior2.prototype.attack = function (this: any): number {
    return this.atk * 2;
};

// 魔法戦士クラス
export function MagicWarrior2(this: any, atk: number, mgc: number): void {
    this.atk = atk;
    this.mgc = mgc;
}
MagicWarrior2.prototype = Object.create(Warrior2.prototype);
MagicWarrior2.prototype.constructor = MagicWarrior2;
MagicWarrior2.prototype.attack = function (this: any): number {
    return this.atk * 2 + this.mgc;
};

console.log("\n=== prototypeを使った記法 ===");
const warrior2 = new (Warrior2 as any)(10);
console.log("Warrior2 attack:", warrior2.attack()); // 20
const magicWarrior2 = new (MagicWarrior2 as any)(10, 5);
console.log("MagicWarrior2 attack:", magicWarrior2.attack()); // 25
