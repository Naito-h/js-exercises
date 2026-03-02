import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// 最初の子プロセスを起動
let childProcess = startChild();

// シグナルを受け取ったときの処理
async function handleSignal(signalName) {
  console.log(`${signalName}を受け取りました。子プロセスを終了します...`);
  if (child) {
    child.kill(signalName); // 子プロセスに受け取ったシグナルを送信して終了させる
  }
}

// Ctrl+C
process.on("SIGINT", () => handleSignal("SIGINT"));

// kill 
process.on("SIGTERM", () => handleSignal("SIGTERM"));

async function monitorChild() {
  while (true) {
    const [code, signal] = await childProcess; // 子プロセスの終了を待つ

    if (code !== 0 && signal === null) {
      // 異常終了した場合は再起動する
      console.error(`異常終了しました。再起動します...(コード: ${code}, シグナル: ${signal})`);
      childProcess = startChild();
    } else if (signal !== null) {
      // シグナルによって終了した場合は親プロセスも終了する
      console.log(`${signal} によって終了しました。(コード: ${code}, シグナル: ${signal})`);
      process.exit(0);
    } else {
      // 正常終了した場合はこのプロセスも終了する
      console.log(`正常に終了しました。(コード: ${code}, シグナル: ${signal})`);
      process.exit(0);
    }
  }
}

// 子プロセスの監視を開始
monitorChild();
