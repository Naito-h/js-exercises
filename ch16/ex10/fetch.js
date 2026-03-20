import fs from "fs";

// NOTE: file.txt の内容をアップロード
const beforeMemoryUsage = process.memoryUsage().heapUsed;
console.log("Before:", beforeMemoryUsage, "bytes");

// NOTE: file.txt の内容をアップロード
fetch("http://localhost:8000/hello.txt", {
  method: "PUT",
  body: fs.createReadStream("./ch16/ex10/file.txt"),
  duplex: "half",
});

// fetch("http://localhost:8000/foo/bar/hello.txt", {
//   method: "PUT",
//   body: fs.readFileSync("./ch16/ex10/file.txt"),
//   duplex: "half",
// });

// fetch 完了後に計測することで、実際のファイル読み込み中のメモリ使用量を反映できる
console.log("After:", process.memoryUsage().heapUsed, "bytes");
console.log("メモリ使用量:", process.memoryUsage().heapUsed - beforeMemoryUsage, "bytes");
