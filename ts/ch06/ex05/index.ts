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

// 出力結果
// key: 1, value: 100
// key: 2, value: 2
// key: text1, value: new text1
// key: world, value: World
// key: text2, value: new text2
// key: 3, value: 3
// key: hello, value: Hello
// key: text3, value: text3

// 独自プロパティの数値（数値の小さい順）
// 独自プロパティの文字列（登録順）
// プロトタイプオブジェクトの数値（数値の小さい順）
// プロトタイプオブジェクトの文字列（登録順）