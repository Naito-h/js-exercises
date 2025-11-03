import exp from 'constants';
import { promiseReaddir, promiseStat, promisifiedReaddir, promisifiedStat } from './index.ts';

describe('promiseReaddir', () => {
    it('ディレクトリの内容を正しく読み取る', async () => {
        const files = await promiseReaddir('./ch13/ex03', {});
        expect(Array.isArray(files)).toBe(true);
        expect(files).toContain('index.ts');
        expect(files).toContain('index.test.ts');
    });
    it('存在しないパスの場合にエラーを投げる', async () => {
        await expect(promiseReaddir('./non/existent/path', {})).rejects.toThrow();
    });
});

describe('promiseStat', () => {
    it('ファイルの統計情報を正しく取得する', async () => {
        const stats = await promiseStat('./ch13/ex03/index.ts', {});
        expect(stats).toHaveProperty('size');
        expect(stats.size).toBeGreaterThan(100); // ファイルサイズが100バイトより大きいことを確認
    });
    it('存在しないパスの場合にエラーを投げる', async () => {
        await expect(promiseStat('./non/existent/file.ts', {})).rejects.toThrow();
    });
});

describe('promisifiedReaddir', () => {
    it('ディレクトリの内容を正しく読み取る', async () => {
        const files = await promisifiedReaddir('./ch13/ex03', {});
        expect(Array.isArray(files)).toBe(true);
        expect(files).toContain('index.ts');
        expect(files).toContain('index.test.ts');
    });
    it('存在しないパスの場合にエラーを投げる', async () => {
        await expect(promisifiedReaddir('./non/existent/path', {})).rejects.toThrow();
    });
});

describe('promisifiedStat', () => {
    it('ファイルの統計情報を正しく取得する', async () => {
        const stats = await promisifiedStat('./ch13/ex03/index.ts', {});
        expect(stats).toHaveProperty('size');
        expect(stats.size).toBeGreaterThan(100); // ファイルサイズが100バイトより大きいことを確認
    });
    it('存在しないパスの場合にエラーを投げる', async () => {
        await expect(promisifiedStat('./non/existent/file.ts', {})).rejects.toThrow();
    });
});
