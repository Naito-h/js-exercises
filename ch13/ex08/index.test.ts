import { fetchFirstFileSize, fetchSumOfFileSizes } from './index.ts';

describe('fetchFirstFileSize', () => {
    it('ディレクトリ内の最初のファイルのサイズを正しく取得する', async () => {
        const path = './ch13/ex08';
        const result = await fetchFirstFileSize(path);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(500);
    });

    it('存在しないディレクトリの場合はエラーを投げる', async () => {
        const path = './non/existent/path';
        await expect(fetchFirstFileSize(path)).rejects.toThrow();
    });
});

describe('fetchSumOfFileSizes', () => {
    it('ディレクトリ内の全ファイルのサイズの合計を正しく取得する', async () => {
        const path = './ch13/ex08';
        const result = await fetchSumOfFileSizes(path);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(1000);
    });

    it('存在しないディレクトリの場合はエラーを投げる', async () => {
        const path = './non/existent/path';
        await expect(fetchSumOfFileSizes(path)).rejects.toThrow();
    });
});
