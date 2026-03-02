import fs from "fs";

// NOTE: file.txt の内容をアップロード
const beforeMemoryUsage = process.memoryUsage().heapUsed;
console.log("Before:", beforeMemoryUsage, "bytes");

const fileContent = await fs.readFileSync("./ch16/ex10/kokoro.txt");
// const fileContent = fs.createReadStream("./ch16/ex10/kokoro.txt");

await fetch("http://localhost:8000/output.txt", {
  method: "PUT",
  body: fileContent,
  duplex: "half",
}).then(response => {
  if (response.ok) {
    console.log("ファイルが正常にアップロードされました");
  } else {
    console.error("ファイルのアップロードに失敗しました:", response.statusText);
  }
}).catch(error => {
  console.error("エラー:", error);
});

// fetch 完了後に計測することで、実際のファイル読み込み中のメモリ使用量を反映できる
console.log("After:", process.memoryUsage().heapUsed, "bytes");
console.log("メモリ使用量:", process.memoryUsage().heapUsed - beforeMemoryUsage, "bytes");
