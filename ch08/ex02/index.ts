export const power = (x: number, n: number): number => {
    let result = 1;

    // 負の値のときはエラーを投げる
    if (n < 0) {
        throw new Error("正の整数を指定してください");
    }

    // 0以下になるまで繰り返す
    while (n > 0) {
        // nが奇数のときはxを掛けて、nを1減らす
        // nが偶数のときはxを二乗して、nを2で割る
        if (n % 2 === 1) {
            result *= x;
            n--;
        } else {
            x *= x;
            n /= 2;
        }
    }
    return result;
};

console.log(power(2, 8)); // 256
console.log(power(2, 11)); // 2048
console.log(power(2, 0)); // 1
// console.log(power(2, -3)); // Error: 正の整数を指定してください
