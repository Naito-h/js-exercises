onmessage = (event) => {
  if (event.data.type === "initUrgentPort") {
    let urgentPort = event.data.port;

    // urgentPort からのメッセージを受信する処理を設定
    urgentPort.onmessage = (event) => {
      const { data, size } = event.data;
      const { width, height } = size;

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
    };
    return;
  }
};