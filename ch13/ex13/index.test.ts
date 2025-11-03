import { walk } from './index.ts';

describe('walk', () => {
    test('指定されたディレクトリ内のファイルとディレクトリを再帰的に探索する', async () => {
        const rootPath = './ch13/ex13';
        const entries: { path: string; isDirectory: boolean }[] = [];
        for await (const entry of walk(rootPath)) {
            entries.push(entry);
        }
        expect(entries).toEqual([
            { path: './ch13/ex13/dir', isDirectory: true },
            { path: './ch13/ex13/dir/file.txt', isDirectory: false },
            { path: './ch13/ex13/index.test.ts', isDirectory: false },
            { path: './ch13/ex13/index.ts', isDirectory: false },
        ]);
    });
});
