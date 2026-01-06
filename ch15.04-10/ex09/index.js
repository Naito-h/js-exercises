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

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
    // const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // // TODO: ここで imageData.data を参照して outputData に結果を格納
    //
    // const outputImageData = new ImageData(outputData, img.width, img.height);
    // filteredCtx.putImageData(outputImageData, 0, 0);
    // ```
    // ガウシアンフィルタ用の出力配列を作成
    const outputData = new Uint8ClampedArray(imageData.data.length);
    
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
    
    const width = img.width;
    const height = img.height;
    
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

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
