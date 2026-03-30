## TypeScriptのトランスパイルについて

### トランスパイルとは
- ある言語を他の言語に変換すること

---

### @babel/preset-typescript
- 古いバージョンや環境でも動作するJavaScriptの構文に変換
- 単に型を消すだけで、型チェックは行われない
- enum など一部の機能が非対応となっている
- 変換が高速
- プラグインで拡張が可能


### tsc
- TypeScriptの開発チームが提供しているトランスパイラ
- 型チェックを行い、型エラーを検出する
- TypeScriptのすべての機能が利用できる
- 意味的に正しいかを重要視している

---

#### 参考
- https://t-yng.jp/post/tsc-and-babel
- https://note.com/happy_avocet7237/n/n0136d930f993