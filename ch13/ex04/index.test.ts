import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.ts";

describe("fetchFirstFileSize", () => {
    it("ディレクトリ内の最初のファイルのサイズを正しく取得する", async () => {
        const path = "./ch13/ex04";
        const size = await fetchFirstFileSize(path);
        expect(typeof size).toBe("number");
        expect(size).toBeGreaterThan(0);
    });

    it("存在しないディレクトリの場合はエラーを投げる", async () => {
        const path = "./ch13/ex04/nonExistentDir";
        await expect(fetchFirstFileSize(path)).rejects.toThrow();
    });
});

describe("fetchSumOfFileSizes", () => {
    it("ディレクトリ内の全ファイルのサイズの合計を正しく取得する", async () => {
        const path = "./ch13/ex04";
        const totalSize = await fetchSumOfFileSizes(path);
        expect(typeof totalSize).toBe("number");
        expect(totalSize).toBeGreaterThan(0);
    });

    it("存在しないディレクトリの場合はエラーを投げる", async () => {
        const path = "./ch13/ex04/nonExistentDir";
        await expect(fetchSumOfFileSizes(path)).rejects.toThrow();
    });
});
