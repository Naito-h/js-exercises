### 明示的にイテレータプロトコルの next() を呼び出す
- 両者とも next を呼び出すと { value, done } オブジェクトを返す
- 値がある間は done には false が入り、すべて完了すると done が true になる
- ジェネレータは最後の next で完了する際、finally ブロックを実行する
```ts
console.log("--- counterIter ---");
const iterIter = counterIter(3);
console.log(iterIter.next());
console.log(iterIter.next());
console.log(iterIter.next());
console.log(iterIter.next());

console.log("--- counterGen ---");
const iterGen = counterGen(3);
console.log(iterGen.next());
console.log(iterGen.next());
console.log(iterGen.next());
console.log(iterGen.next());

// 実行結果
--- counterIter ---
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: 3, done: false }
counterIter: next
{ value: undefined, done: true }
--- counterGen ---
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: next
{ value: 3, done: false }
counterGen: finally
{ value: undefined, done: true }
```

### 明示的にイテレータプロトコルの return() を呼び出す
- counterIter では、1つ目の値の取得後に return を実行すると、return 部分が実行され、
return に渡した値が value として done: true が返る
- counterGen では、1つ目の値の取得後に return を実行すると、finally ブロックが実行され、
{ value: undefined, done: true } が返る
```ts
console.log("--- counterIter with return ---");
const iterIter2 = counterIter(3);
console.log(iterIter2.next());
console.log(iterIter2.return("return value from iterIter2"));

console.log("--- counterGen with return ---");
const iterGen2 = counterGen(3);
console.log(iterGen2.next());
console.log(iterGen2.return());

// 実行結果
--- counterIter with return ---
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: return: return value from iterIter2
{ value: 'return value from iterIter2', done: true }
--- counterGen with return ---
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: finally
{ value: undefined, done: true }
```

### 明示的にイテレータプロトコルの throw() を呼び出す
- counterIter では、1つ目の値の取得後に エラーをスローすると、throw 部分が実行され、
{ value: undefined, done: true } が返る<br>
その後、next 呼び出しで通常通り次の値が返る
- counterGen では、1つ目の値の取得後に エラーをスローすると、catch ブロックでログが出力される<br>
その後、finally ブロックが実行され、再度エラーログが出力される<br>
そして最後に{ value: undefined, done: true } が返る
```ts
console.log("--- counterIter with throw ---");
const iterIter3 = counterIter(3);
console.log(iterIter3.next());
try {
  console.log(iterIter3.throw(new Error("error from iterIter3")));
} catch (e) {
  console.log("caught:", e);
}
console.log(iterIter3.next());

console.log("--- counterGen with throw ---");
const iterGen3 = counterGen(3);
console.log(iterGen3.next());
try {
  console.log(iterGen3.throw(new Error("error from iterGen3")));
} catch (e) {
  console.log("caught:", e);
}
console.log(iterGen3.next());

// 実行結果
--- counterIter with throw ---
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: throw: Error: error from iterIter3
    at file:///C:/js-exercises/ch12/ex01/index.ts:77:31
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async loadESM (node:internal/process/esm_loader:91:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)
{ value: undefined, done: true }
counterIter: next
{ value: 2, done: false }
--- counterGen with throw ---
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: catch: Error: error from iterGen3
    at file:///C:/js-exercises/ch12/ex01/index.ts:87:30
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async loadESM (node:internal/process/esm_loader:91:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)
counterGen: finally
caught: Error: error from iterGen3
    at file:///C:/js-exercises/ch12/ex01/index.ts:87:30
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async loadESM (node:internal/process/esm_loader:91:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)
{ value: undefined, done: true }
```

### for-of ループを実行
- counterIter では、はじめに Symbol.iterator が呼ばれて counterIter 自身を返す<br>
その後通常通り、next が呼ばれて値がある間は値を返す<br>
すべて完了した後は { value: undefined, done: true } を返す
- counterGen では、直接 next が呼ばれて値がある間は値を返す<br>
すべて完了した後は finally ブロックが実行される
```ts
console.log("--- for...of with counterIter ---");
for (let n of counterIter(3)) {
  console.log(n);
}

console.log("--- for...of with counterGen ---");
for (let result of counterGen(3)) {
  console.log(result);
}

// 実行結果
--- for...of with counterIter ---
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: next
3
counterIter: next
--- for...of with counterGen ---
counterGen
counterGen: next
1
counterGen: next
2
counterGen: next
3
counterGen: finally
```

### for-of ループを実行途中で break
- counterIter では、はじめに Symbol.iterator が呼ばれて counterIter 自身を返す<br>
その後、next が呼ばれるが、n = 2 のときに break が実行され、return が呼び出される<br>
- counterGen では、next が呼ばれるが、n = 2 のときに break が実行されると finally ブロックが実行される
```ts
console.log("--- for...of with counterIter and break ---");
for (let n of counterIter(3)) {
  if (n === 2) break;
  console.log(n);
}

console.log("--- for...of with counterGen and break ---");
for (let n of counterGen(3)) {
  if (n === 2) break;
  console.log(n);
}

// 実行結果
--- for...of with counterIter and break ---
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
counterIter: return: undefined
--- for...of with counterGen and break ---
counterGen
counterGen: next
1
counterGen: next
counterGen: finally
```

### for-of ループを実行中に例外発生
- counterIter では、はじめに Symbol.iterator が呼ばれて counterIter 自身を返す<br>
その後、next が呼ばれるが、n = 2 のときに 例外がスローされると return が呼び出される<br>
そして、最後にエラーログが出力される
- counterGen では、next が呼ばれるが、n = 2 のときに 例外がスローされると finally ブロックが実行される<br>
そして、最後にエラーログが出力される
```ts
console.log("--- for...of with counterIter and throw ---");
try {
  for (let n of counterIter(3)) {
    if (n === 2) throw new Error("error from counterIter");
    console.log(n);
  }
} catch (e) {
  console.log("caught:", e);
}

console.log("--- for...of with counterGen and throw ---");
try {
  for (let n of counterGen(3)) {
    if (n === 2) throw new Error("error from counterGen");
    console.log(n);
  }
} catch (e) {
  console.log("caught:", e);
}

// 実行結果
--- for...of with counterIter and throw ---
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
counterIter: return: undefined
caught: Error: error from counterIter
    at file:///C:/js-exercises/ch12/ex01/index.ts:122:24
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async loadESM (node:internal/process/esm_loader:91:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)
--- for...of with counterGen and throw ---
counterGen
counterGen: next
1
counterGen: next
counterGen: finally
caught: Error: error from counterGen
    at file:///C:/js-exercises/ch12/ex01/index.ts:132:24
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async loadESM (node:internal/process/esm_loader:91:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)
```
