// オブジェクトを定義
const object1 = {
    1: 1,
    text1: "text1",
    hello: "Hello",
    text3: "text3",
    3: 3,
}

// 列挙可能なプロパティを追加
Object.defineProperty(object1, "newProperty", {
    value: "value",
    enumerable: true,
});

// Object1のプロトタイプを利用して新しいオブジェクトを作成
const object2 = Object.create(object1);
object2[1] = 100;
object2.text1 = "new text1";
object2[2] = 2;
object2.world = "World";
object2.text2 = "new text2";

// 列挙可能なプロパティを列挙不可で上書き
Object.defineProperty(object2, "newProperty", {
    value: "new value",
    enumerable: false,
});

// for/inループで列挙して順番を確認
for (const key in object2) {
    console.log(`key: ${key}, value: ${object2[key]}`);
}

// 独自プロパティの数値（数値の小さい順）
// 独自プロパティの文字列（登録順）
// プロトタイプオブジェクトの数値（数値の小さい順）
// プロトタイプオブジェクトの文字列（登録順）