以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。
```
let x = 0;

for(let i = 1; i <= 5; i++) {
    x = i;
    try {
        throw Error();
    } catch {
        break;
    } finally {
        continue;
    }
}

console.log(x);
```

予想：5
結果：5
tryブロックでは、エラーがエラーがスローされるので、catchブロックに移動する。
catchブロックでは、break文が実行されるので、finallyブロックに移動する。
finallyブロックでは、continue文で次のループから再開される。