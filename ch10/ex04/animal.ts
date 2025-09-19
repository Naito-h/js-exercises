// デフォルトエクスポート
export default class Animal2 {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }
    getName(): string {
        return this.#name;
    }
    walk(): void {
        console.log(`${this.#name}が歩いています`);
    }
}

export class Dog2 extends Animal2 {
    bark(): void {
        console.log(`${this.getName()}が吠えています`);
    }
}

export class Cat2 extends Animal2 {
    meow(): void {
        console.log(`${this.getName()}が鳴いています`);
    }
}
