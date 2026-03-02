import fs from "fs";

// ファイルのサイズを確認する
const stats = fs.statSync("./ch16/ex06/hello.txt");
console.log(`truncate前のhello.txtのサイズ: ${stats.size}バイト`);

// hello.txtを100バイトに拡張する
fs.truncateSync("./ch16/ex06/hello.txt", 100);

// truncate後のファイルのサイズを確認する
const newStats = fs.statSync("./ch16/ex06/hello.txt");
console.log(`truncate後のhello.txtのサイズ: ${newStats.size}バイト`);