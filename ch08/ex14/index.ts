// 1. 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返すany 関数
const isNonZero = any(
  (n: number) => n > 0,
  (n: number) => n < 0
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true

export function any(...functions: Function[]) {
  return (value: any) => functions.some((fn) => fn(value));
}

// 2. 引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返すcatching 関数
const safeJsonParse = catching(JSON.parse, (e) => {
  return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}

export function catching(f: Function, g: (e: any) => any) {
  return function(...args: any[]) {
    try {
      return f(...args);
    } catch (e) {
      return g(e);
    }
  };
}


