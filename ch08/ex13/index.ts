function f(input: string) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

f('"", 100000*1000000;'); // 100000000000

// 回答例
f('(console.log("悪意のあるコードが実行されました"), "")'); // 悪意のあるコードが実行されました
