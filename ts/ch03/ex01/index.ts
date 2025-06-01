let result: number;

// 左辺がInfinity、右辺がNaN
result = Infinity + NaN;
console.log("Infinity + NaN = " + result);
result = Infinity - NaN;
console.log("Infinity - NaN = " + result);
result = Infinity * NaN;
console.log("Infinity * NaN = " + result);
result = Infinity / NaN;
console.log("Infinity / NaN = " + result);

// 左辺がNaN、右辺がInfinity
result = NaN + Infinity;
console.log("NaN + Infinity = " + result);
result = NaN - Infinity;
console.log("NaN - Infinity = " + result);
result = NaN * Infinity;
console.log("NaN * Infinity = " + result);
result = NaN / Infinity;
console.log("NaN / Infinity = " + result);

// 左辺が-Infinity、右辺がNaN
result = -Infinity + NaN;
console.log("-Infinity + NaN = " + result);
result = -Infinity - NaN;
console.log("-Infinity - NaN = " + result);
result = -Infinity * NaN;
console.log("-Infinity * NaN = " + result);
result = -Infinity / NaN;
console.log("-Infinity / NaN = " + result);

// 左辺がNaN、右辺が-Infinity
result = NaN + -Infinity;
console.log("NaN + -Infinity = " + result);
result = NaN - -Infinity;
console.log("NaN - -Infinity = " + result);
result = NaN * -Infinity;
console.log("NaN * -Infinity = " + result);
result = NaN / -Infinity;
console.log("NaN / -Infinity = " + result);
