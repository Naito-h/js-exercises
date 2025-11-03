import * as fs from 'fs';

// 指定されたファイルパスを受け取り、そのファイルを改行コード \n の出現ごとに分割して返すジェネレータ関数
export function* readLines(filePath: string): Generator<string> {
    // ファイルを開く
    const fd = fs.openSync(filePath, 'r');

    try {
        // ファイルの内容を読み込む
        const data = fs.readFileSync(fd, 'utf-8');

        // 改行で分割して各行を返す
        const lines = data.split('\n');
        for (const line of lines) {
            // 改行を含まない行を返す
            yield line.trim();
        }
    } catch (error) {
        console.error('Error reading file:', error);
    } finally {
        // ファイルを閉じる
        fs.closeSync(fd);
    }
}

const filePath = './ch12/ex05/index.txt'; // 読み込むファイルのパス
console.log([...readLines(filePath)]);