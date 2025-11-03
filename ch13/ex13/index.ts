import * as fs from 'node:fs/promises';

// 指定されたディレクトリ内のファイル/ディレクトリを再帰的に探索するジェネレータ関数
export async function* walk(rootPath: string): AsyncGenerator<{ path: string; isDirectory: boolean }> {
    const entries = await fs.readdir(rootPath, { withFileTypes: true });
    for await (const entry of entries) {
        const fullPath = `${rootPath}/${entry.name}`;
        if (entry.isDirectory()) {
            // ディレクトリの場合は再帰的に探索
            yield { path: fullPath, isDirectory: true };
            yield* walk(fullPath);
        } else if (entry.isFile()) {
            // ファイルの場合はそのパスを返す
            yield { path: fullPath, isDirectory: false };
        }
    }
}

// const rootPath = './ch13';
// await (async () => {
//     for await (const elem of walk(rootPath)) {
//         console.log(elem);
//     }
// })();