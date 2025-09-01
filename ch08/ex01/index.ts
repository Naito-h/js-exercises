// 1. 自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す
export const displaynth = (n: number, c: string): string[] => {
    const result: string[] = [];
    for (let i = 1; i <= n; i++) {
        console.log(c);
        result.push(c);
    }
    return result;
};

console.log(displaynth(5, "Hello, World!"));

// 2. 数値xを引数にとり、xの二乗の数値を返す
export const square = (x: number): number => {
    return x * x;
};

console.log(square(5));

// 3. 引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す
export const now = (): object => {
    const date = new Date();
    return { now: date.toISOString() };
};

console.log(now());
