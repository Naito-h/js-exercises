# jQuery Deferred とは
- 非同期処理を扱うための仕組み
- 非同期処理の状態を管理し、コールバック関数を登録・実行できる
- 非同期処理のそれぞれに Promise オブジェクトを割り当て、そのオブジェクトの状態を伝播させていくことで処理を進める

## Promiseとの共通点
- 非同期の結果を扱う
- コールバック関数を登録して、処理の完了後に実行できる

## 違い
- 外部から状態を変更することができる
- コールバック関数は done, fail, progress
- 進行中であることを表す状態の progress がある
- 処理が同期的に実行される場合もある

## 使い方
1. $.Deferred オブジェクトを作る
1. Diferredオブジェクトを使って、非同期の処理を書く
1. 処理が終わったらDeferredの状態が変わるようにする
```ts
function delayHello() {
  const d = new $.Deferred; // Deferredオブジェクトを作成
  const promise = d.promise(); // Promise
  promise.done(() => {
    console.log("hello"); // 成功時のコールバック
  });
  d.resolve("finish"); // Deferredを成功状態にする
}
```