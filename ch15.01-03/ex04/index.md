# グローバルオブジェクト
## グローバルオブジェクトの参照方法
1. ブラウザ内：
`window`
`self`
1. Node内：
`global`
1. ブラウザ・Node問わず： 
`globalThis`

## ブラウザ独自のプロパティやメソッド
1. `document`  
HTMLドキュメントを操作するためのオブジェクト
1. `window`  
ブラウザのウィンドウを表すオブジェクト
1. `navigator`  
ブラウザやOSの情報を取得するためのオブジェクト
1. `location`  
現在のURL情報を取得・変更するためのオブジェクト
1. `fetch()`  
ネットワークリクエストを行うAPI
1. `alert()`  
ユーザーにダイアログを表示するメソッド
1. `confirm()`  
ユーザーにダイアログを表示するメソッド
1. `prompt()`  
ユーザーにダイアログを表示するメソッド
1. `localStorage`  
ブラウザのストレージ機能
1. `history`  
ブラウザの履歴を操作するオブジェクト
1. `addEventListener()`  
DOM要素やwindowイベントを登録するためのメソッド

## グローバルオブジェクトの undefined
### 確認方法
```js
console.log("undefined" in globalThis); // true
```

### 過去のES仕様で発生していた問題
- `undefined` が再代入可能だった  
`undefined` が上書きできてしまうことで、`undefined` に依存するコードが壊れてしまうことがあった。  
現在では、グローバルの `undefined` は読み取り専用かつ再定義不可になったため、上書きによるバグはなくなった。

