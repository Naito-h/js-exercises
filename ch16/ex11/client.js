import net from "net";

const sockets = [];
let successCount = 0;
let errorCount = 0;
const MAX_ATTEMPTS = 100000; // 最大試行回数

function connectServer(id) {
  const socket = net.createConnection(8000, "localhost");
  
  socket.on("connect", () => {
    successCount++;
    sockets.push(socket);
    console.log(`Connection ${id} succeeded. Total: ${successCount}`);
  });
  
  socket.on("error", (err) => {
    errorCount++;
    console.log(`Connection ${id} failed: ${err.message}. Total errors: ${errorCount}`);
    if (errorCount >= 10) {
      console.log(`\n=== テスト完了 ===`);
      console.log(`成功した接続数: ${successCount}`);
      console.log(`失敗した接続数: ${errorCount}`);
      console.log(`同時接続可能数: 約${successCount}接続`);
      process.exit(0);
    }
  });
}

// 少しずつ接続を試みる
let count = 0;
const interval = setInterval(() => {
  connectServer(count);
  count++;
  
  if (count >= MAX_ATTEMPTS) {
    clearInterval(interval);
    console.log(`\n=== ${MAX_ATTEMPTS}回試行完了 ===`);
    console.log(`成功した接続数: ${successCount}`);
    console.log(`失敗した接続数: ${errorCount}`);
  }
}, 1); // 1msごとに接続を試みる