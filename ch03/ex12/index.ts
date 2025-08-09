class Example{
    valueOf(): number {
        return 100;
    }

    toString(): string {
        return "Exampleクラスのインスタンス";
    }
}

// Exampleクラスのインスタンスを作成
const obj: Example = new Example();

console.log(Number(obj) + 23);
console.log(`これは ${obj} です`);
