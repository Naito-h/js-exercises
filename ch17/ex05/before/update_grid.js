// Life Game のルールに従ってセルを更新する
export function updateGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let liveNeighbors = 0;
      // 周囲８方向のセルをチェックし、生きている場合はカウント
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // 自分自身を除く
          if (!(i === 0 && j === 0)) {
            let dr = row + i;
            let dc = col + j;
            // 盤面の範囲内かチェック
            if (dr >= 0 && dr < rows && dc >= 0 && dc < cols) {
              if (grid[dr][dc]) {
                liveNeighbors++; // 生きている場合はカウント
              }
            }
          }
        }
      }
      if (grid[row][col]) {
        // セルが生きている場合
        // 2つか3つの生存している隣接セルがある場合は生き続ける
        // それ以外の場合は死ぬ
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[row][col] = false;
        }
      } else {
        // セルが死んでいる場合
        // ちょうど3つの生存している隣接セルがある場合は生き返る
        if (liveNeighbors === 3) {
          nextGrid[row][col] = true;
        }
      }
    }
  }
  return nextGrid;
}