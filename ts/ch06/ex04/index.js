const object1 = {};

Object.defineProperty(object1, 'property1', {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
});

Object.defineProperty(object1, 'property2', {
    value: 2,
    writable: false,
    enumerable: false,
    configurable: false
}); 

// プロパティの値を変更
object1.property1 = 100;
console.log(object1.property1); // 100
// object1.property2 = 'World'; // writable が falseなので変更できない(エラーになる)
console.log(object1.property2); // 2

// プロパティを削除
// delete object1.property1; // 消えてしまうのでコメントアウト
console.log(object1.property1); // undefined
// delete object1.property2; // configurable が falseなので削除できない(エラーになる)
console.log(object1.property2); // 2

// hasOwnPropertyを使用してプロパティの存在を確認
console.log(object1.hasOwnProperty('property1')); // true
console.log(object1.hasOwnProperty('property2')); // true

// propertyIsEnumerableを使用してプロパティの列挙可能性を確認
console.log(object1.propertyIsEnumerable('property1')); // true
console.log(object1.propertyIsEnumerable('property2')); // false enumerable が falseなので列挙できない
