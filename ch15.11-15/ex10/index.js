document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // worker を作成
    let worker = new Worker("worker.js")

    // Urgent ポートを初期化して worker に送信
    let urgentChannel = new MessageChannel();
    let urgentPort = urgentChannel.port1;
    worker.postMessage({ type: "initUrgentPort", port: urgentChannel.port2 }, [urgentChannel.port2]);

    // Urgent ポートからのメッセージを受信したときの処理
    urgentPort.onmessage = (event) => {
      const outputImageData = new ImageData(event.data.data, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
    };

    // 画像データを worker に送信して処理を開始
    urgentPort.postMessage({data: data, size: { width: img.width, height: img.height }}, [data.buffer]);
  });

  reader.readAsDataURL(file);
});

// Web Worker の実行中もメインスレッドがブロックされていないことの確認用
// カウンターを表示
let counter = 0;
const counterElement = document.querySelector("div#counter");
setInterval(() => {
  counterElement.textContent = `Counter: ${counter++}`;
}, 100);