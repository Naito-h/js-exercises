// オブジェクトを定義
const object1 = { p1: 1, p2: 2, p3: 3 };

// Object.createでオブジェクトを生成
const object2 = Object.create(object1);

console.log(Object.getPrototypeOf(object2)); // => { p1: 1, p2: 2, p3: 3 }
console.log(object1 === Object.getPrototypeOf(object2)); // => true