import * as fs from 'node:fs/promises';

export async function fetchSumOfFileSizes(path: string) {
    // ファイル一覧の配列を取得
    const files = await fs.readdir(path);

    // 各ファイルのサイズを非同期に取得し、すべての結果が揃うのを待つ
    const statsArray = await Promise.all(
        files.map(file => fs.stat(`${path}/${file}`))
    );

    // 各ファイルのサイズを合計して返す
    return statsArray.reduce((sum, stats) => sum + stats.size, 0);
}

// fetchSumOfFileSizes("ch13/ex10")
//     .then(size => console.log(size))
//     .catch(err => console.error(err));