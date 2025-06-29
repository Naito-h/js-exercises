```
 for (i = 1; i < 101; i++)
  console.log((i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i);
```
### 3の倍数のとき(Fizz)
i % 3 は 0(false) なので "Fizz"<br>
i % 5 は 0以外(true) なので ""<br>
"Fizz" + "" で "Fizz"

### 5の倍数のとき(Buzz)
i % 3 は 0以外(true) なので ""<br>
i % 5 は 0(false) なので "Buzz"<br>
"" + "Buzz" で "Buzz"

### 15の倍数のとき(FizzBuzz)
i % 3 は 0(false) なので "Fizz"<br>
i % 5 は 0(false) なので "Buzz"<br>
"Fizz" + "Buzz" で "FizzBuzz"

### それ以外のとき(数値)
i % 3 は 0以外(true) なので ""<br>
i % 5 は 0以外(true) なので ""<br>
"" + "" で "" だが、falseに変換されてしまうので i の数値が表示される