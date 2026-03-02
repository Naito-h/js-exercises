import threads from "worker_threads";
import { fileURLToPath } from "url";
import fs from "fs";
import { PNG } from "pngjs";

const imagePath = "./ch16/ex14/image.png";

if (threads.isMainThread) {
  // ワーカースレッドを作成
  const worker = new threads.Worker(fileURLToPath(import.meta.url));

  // MessageChannelを作成して、urgentPortをワーカーに渡す
  let channel = new threads.MessageChannel();
  let urgentPort = channel.port1;
  worker.postMessage({ command: "initUrgentPort", port: channel.port2 }, [channel.port2]);

  // PNG画像を読み込んでデコード
  const img = fs.readFileSync(imagePath);
  const png = PNG.sync.read(img);
  const imgArray = new Uint8ClampedArray(png.data);
  const width = png.width;
  const height = png.height;

  // 画像データとサイズをurgentPortを通じてワーカーに送信
  urgentPort.postMessage({
    data: imgArray,
    size: { width, height }
  }, [imgArray.buffer]);

  // ワーカーからの処理結果を受け取り、PNG画像として保存
  urgentPort.once("message", (message) => {
    const outputData = message.data;
    const outputPng = new PNG({ width, height });
    outputPng.data = Buffer.from(outputData);
    const buffer = PNG.sync.write(outputPng);
    fs.writeFileSync("./ch16/ex14/filtered_image.png", buffer);
    console.log("画像の処理が完了しました");
    process.exit(0);
  });

} else {
  threads.parentPort.on("message", (event) => {
    if (event.command === "initUrgentPort") {
      let urgentPort = event.port;

      // urgentPort から画像データとサイズを受信
      urgentPort.on("message", (event) => {
        const data = event.data;
        const { width, height } = event.size;

        const outputData = new Uint8ClampedArray(data.length);

        // 5x5 ガウシアンカーネル（ぼかし効果）
        const kernel = [
          [1, 4, 6, 4, 1],
          [4, 16, 24, 16, 4],
          [6, 24, 36, 24, 6],
          [4, 16, 24, 16, 4],
          [1, 4, 6, 4, 1]
        ];
        const kernelSize = 5;
        const kernelSum = 256; // カーネルの値の合計（正規化用）

        // 画像の全ピクセルに対してフィルタを適用
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;

            // カーネルの各要素を適用
            for (let ky = 0; ky < kernelSize; ky++) {
              for (let kx = 0; kx < kernelSize; kx++) {
                // 現在のピクセルから見た周辺ピクセルの座標を計算
                const px = x + kx - Math.floor(kernelSize / 2);
                const py = y + ky - Math.floor(kernelSize / 2);

                // 画像の範囲内かチェック
                if (px >= 0 && px < width && py >= 0 && py < height) {
                  // ピクセルデータの位置を計算（1ピクセル = RGBA の4要素）
                  const offset = (py * width + px) * 4;
                  const weight = kernel[ky][kx];

                  // 重み付き平均を計算
                  r += data[offset] * weight;
                  g += data[offset + 1] * weight;
                  b += data[offset + 2] * weight;
                }
              }
            }

            // 出力ピクセルの位置を計算
            const offset = (y * width + x) * 4;

            // カーネルの合計で割って正規化し、出力配列に格納
            outputData[offset] = r / kernelSum;
            outputData[offset + 1] = g / kernelSum;
            outputData[offset + 2] = b / kernelSum;
            outputData[offset + 3] = data[offset + 3]; // アルファ値はそのままコピー
          }
        }

        // urgentPort を使って結果を送信
        urgentPort.postMessage({ data: outputData }, [outputData.buffer]);
      });
    }
  });
}