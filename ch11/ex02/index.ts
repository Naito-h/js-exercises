// f はオブジェクトを1つ引数に取る関数
export function cache(f: Function) {
  // WeakMapを使ってキャッシュを保存
  const map = new WeakMap();

  // 同じ引数で繰り返し呼び出された時にはキャッシュを返す関数を返す
  return function (obj: object) {
    if (map.has(obj)) {
      return map.get(obj);
    } else {
      const result = f(obj);
      map.set(obj, result);
      return result;
    }
  };
}

function slowFn({}: object): number {
  console.log("処理開始...");
  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += Math.sqrt(i) * Math.sin(i);
  }
  console.log("処理完了！");
  return total;
}

const object = { a: 1 };

// // キャッシュ付きの関数を作成
// const cachedSlowFn = cache(slowFn);

// const result = cachedSlowFn(object);
// console.log("結果:", result);
// console.log("もう一度呼び出し...");
// const result2 = cachedSlowFn(object);
// console.log("結果:", result2);
