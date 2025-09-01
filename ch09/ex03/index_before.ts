export class PositiveNumber {
    x: number;
    constructor(x: number) {
        if (x <= 0) {
            throw new Error("require : x > 0");
        }
        this.x = x;
    }

    getX(): number {
        return this.x;
    }

    setX(x: number): void {
        if (x <= 0) {
            throw new Error("require : x > 0");
        }
        this.x = x;
    }
}

const num = new PositiveNumber(42);
console.log(num.getX()); // => 42
num.setX(20);
console.log(num.getX()); // => 20
num.x = 10;
console.log(num.getX()); // => 10
