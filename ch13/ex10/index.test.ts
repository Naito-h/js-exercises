import { fetchSumOfFileSizes } from './index.ts';

describe('fetchSumOfFileSizes', () => {
    it('./ch13/ex10の場合', async () => {
        const path = './ch13/ex10';
        const result = await fetchSumOfFileSizes(path);
        expect(result).toBeGreaterThan(1000); // コメントの編集などでファイルサイズが変わる可能性があるため、1000バイトより大きいことを確認
    });

    it('存在しないパスの場合', async () => {
        const path = './non/existent/path';
        await expect(fetchSumOfFileSizes(path)).rejects.toThrow();
    });
});