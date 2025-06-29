以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。
```
function f() {
    try {
        return true;
    } finally {
        return false;
    }
}

console.log(f());
```
予想：false

結果：false

tryブロックの処理の後に、必ずfinallyブロックのコードが実行されるため、finallyブロックのfalseが出力された。