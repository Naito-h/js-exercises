import * as fs from 'fs';

// 指定されたディレクトリ内のファイル/ディレクトリを再帰的に探索するジェネレータ関数
export function* walk(rootPath: string): Generator<{ path: string; isDirectory: boolean }> {
    const entries = fs.readdirSync(rootPath, { withFileTypes: true });
    for (const entry of entries) {
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

const rootPath = './ch12';
console.log([...walk(rootPath)]);
