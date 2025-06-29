// undefined
// 予想：undefined
// 結果：undefined
console.log(typeof undefined); // undefined

// null
// 予想：object
// 結果：object
console.log(typeof null); // object

// オブジェクト
// 予想：object
// 結果：object
console.log(typeof {}); // object

// NaN
// 予想：object
// 結果：number
console.log(typeof NaN); // number

// 数値
// 予想：number
// 結果：number
console.log(typeof 123); // number

// 関数
// 予想：function
// 結果：function
console.log(typeof (() => {})); // function
