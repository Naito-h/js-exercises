export class PositiveNumber {
    #x: number;
    constructor(x: number) {
        if (x <= 0) {
            throw new Error("require : x > 0");
        }
        this.#x = x;
    }

    getX(): number {
        return this.#x;
    }

    setX(x: number): void {
        if (x <= 0) {
            throw new Error("require : x > 0");
        }
        this.#x = x;
    }
}

const num = new PositiveNumber(42);
console.log(num.getX()); // => 42
num.setX(20);
console.log(num.getX()); // => 20
// num.x = 10; // xはプライベートフィールドなので直接アクセスできない
console.log(num.getX()); // => 20

// クロージャを使った記法
export function PositiveNumber2 (x: number): any {
    if (x <= 0) {
        throw new Error("require : x > 0");
    }
    let y = x;

    return {
        getX: (): number => y,
        setX: (value: number): void => {
            if (value <= 0) {
                throw new Error("require : x > 0");
            }
            y = value;
        }
    }
}

const num2 = PositiveNumber2(42);
console.log(num2.getX());
num2.setX(20);
console.log(num2.getX());
// num2.x = 10; // xはプライベートフィールドなので直接アクセスできない
console.log(num2.getX()); // => 20
