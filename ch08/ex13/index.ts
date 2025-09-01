function f(input: string) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

f('"", 100000*1000000;'); // 100000000000
