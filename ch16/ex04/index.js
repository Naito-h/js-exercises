import fs from "fs/promises";
import iconv from "iconv-lite";

// hello.txtを読み込み、Shift_JISからUTF-8に変換して表示する
const text = await fs.readFile("./ch16/ex04/hello.txt")
const buf = iconv.decode(text, "Shift_JIS");
console.log(`hello.txtの内容: ${buf}`);