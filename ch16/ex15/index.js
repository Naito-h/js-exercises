import threads from "worker_threads";
if (threads.isMainThread) {
  let num = 0; 
  let worker = new threads.Worker(new URL("./index.js", import.meta.url), {
    workerData: null
  });

  // メインスレッドで num をインクリメントする
  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      num++;
    }

    // ワーカーからのメッセージを待ち、受信したら num をインクリメントして出力する
    worker.on("message", (message) => {
      if (message === "increment") {
        num++;
      } else if (message === "done") {
        console.log("num: " + num); // num: 20000000
      }
    });
  });
} else {
  // "num をインクリメントせよ"というメッセージを送る
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("increment");
  }

  // ワーカーはメッセージを送った後、終了する
  threads.parentPort.postMessage("done");
}

