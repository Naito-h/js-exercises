const obj1 = {x: 1} as any;
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2;
console.log(obj1);

const obj2 = {x: 1, y: 2};
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
console.log(obj1 === obj2);

// 予想：true
// 結果：false
// JavaScriptでは、オブジェクトは参照型であり、同じ内容を持つオブジェクトでも異なる参照を持つため、`===`演算子で比較すると常に`false`になる