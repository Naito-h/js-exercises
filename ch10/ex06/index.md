# 問題10.6
エクスポートしないjsファイルを複数回importする場合、import文の前後やimport先のコードの実行順序はどうなりますか。実証コードを作成し、予想してから実行結果を確認しなさい。

---

## 実証コード
### index.ts
```ts
console.log("これは1つ目です。");
import "./a.ts";
console.log("これは2つ目です。");
import "./b.ts";
console.log("これは3つ目です。");
import "./a.ts";
console.log("これは4つ目です。");
```

### a.ts
```ts
console.log("これはa.tsです。");
```

### b.ts
```ts
console.log("これはb.tsです。");
```

---

## 予想
```
これはa.tsです。
これはb.tsです。
これは1つ目です。
これは2つ目です。
これは3つ目です。
これは4つ目です。
```

- import文は巻き上げられるので、importした順に評価される
- 複数回importしても最初の1つだけ評価される
- index.tsの本体のコードはimortの評価後に順に実行される

## 実行結果
```
これはa.tsです。
これはb.tsです。
これは1つ目です。
これは2つ目です。
これは3つ目です。
これは4つ目です。
```

- import文は巻き上げられる
- import文は一度しか評価されない
- index.tsのコードはimport文の後に順に評価される
