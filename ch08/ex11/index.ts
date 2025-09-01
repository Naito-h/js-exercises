// 自作関数
function myFunction() {
    return "Hello, World!";
}

console.log("----組み込み関数----");
console.log(Math.max.toString());
console.log("----自作関数----");
console.log(myFunction.toString());

/*
実行結果:
----組み込み関数----
function max() { [native code] }
----自作関数----
function myFunction() {
    return "Hello, World!";
}
*/
