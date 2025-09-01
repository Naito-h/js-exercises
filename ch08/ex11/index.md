# 問題
組み込み関数と自作関数の toString() の出力内容を確認しなさい

### 組み込み関数の場合
```
console.log(Math.max.toString());

/*
実行結果:
function max() { [native code] }
*/
```
[native code]と出力され、関数の中身は表示されない

### 自作関数の場合
```
// 自作関数
function myFunction() {
    return "Hello, World!";
}

console.log(myFunction.toString());

/*
実行結果:
function myFunction() {
    return "Hello, World!";
}
*/
```
関数の中身がそのまま出力される
