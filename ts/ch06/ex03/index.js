let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
let f = q.toString();
q.x + q.y;

// オブジェクトのプロトタイプチェーンを確認
console.log(o.isPrototypeOf(p)); // true
console.log(o.isPrototypeOf(q)); // true
console.log(p.isPrototypeOf(q)); // true

// Objectのプロトタイプチェーンを確認
console.log(Object.prototype.isPrototypeOf(Array)); // true
console.log(Object.prototype.isPrototypeOf(Date)); // true
console.log(Object.prototype.isPrototypeOf(Map)); // true

// Arrayのプロトタイプチェーンを確認
console.log(Array.prototype.isPrototypeOf(Object)); // false
console.log(Array.prototype.isPrototypeOf(Date)); // false
console.log(Array.prototype.isPrototypeOf(Map)); // false

// Mapのプロトタイプチェーンを確認
console.log(Map.prototype.isPrototypeOf(Object)); // false
console.log(Map.prototype.isPrototypeOf(Array)); // false
console.log(Map.prototype.isPrototypeOf(Date)); // false

// Dateのプロトタイプチェーンを確認
console.log(Date.prototype.isPrototypeOf(Object)); // false
console.log(Date.prototype.isPrototypeOf(Array)); // false
console.log(Date.prototype.isPrototypeOf(Map)); // false