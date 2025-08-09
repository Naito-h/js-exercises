// 整数の最大値と最小値を表示する
const maxNumber: number = Number.MAX_VALUE;
const minNumber: number = Number.MIN_VALUE;
console.log("maxNumber: " + maxNumber);
console.log("minNumber: " + minNumber);

// 整数の最大値+1を表示する
console.log("maxNumber + 1: " + (maxNumber + 1));

// 最大値+1と最大値+2を比較する
console.log(maxNumber + 1 === maxNumber + 2); // true

// JavaScriptでは数値の精度に限界（浮動小数点の丸め誤差）がある
// Number.MAX_VALUEほど大きな値になると、1や2を加算しても、誤差が検出できない
// そのため、maxNumber + 1とmaxNumber + 2は等しいと判定される