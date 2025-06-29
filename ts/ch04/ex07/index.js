// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
}

// 例:
set42("for (let i = 0; i < 5; i++) { console.log(i); }; const hello");
// console.log(hello); // 42
