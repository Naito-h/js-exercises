import { retryWithExponentialBackoff } from "./index.ts";

describe("retryWithExponentialBackoff", () => {
    jest.setTimeout(40000); // タイムアウトを40秒に設定（デフォルトは5秒）

    test("リトライで成功する", async () => {
        let attemptCount = 0;
        const maxAttempts = 3;
        const result = await retryWithExponentialBackoff(async () => {
            attemptCount++;
            console.log(`試行回数: ${attemptCount}`);
            if (attemptCount <= maxAttempts) {
                throw new Error("失敗");
            }
            return "成功";
        }, maxAttempts);
        expect(result).toBe("成功");
    });

    test("最大リトライ回数に達したらエラーを投げる", async () => {
        let attemptCount = 0;
        const maxAttempts = 3;
        await expect(
            retryWithExponentialBackoff(async () => {
                attemptCount++;
                console.log(`試行回数: ${attemptCount}`);
                if (attemptCount <= maxAttempts + 1) {
                    throw new Error("失敗");
                }   
                return "成功";
            }, maxAttempts)
        ).rejects.toThrow("失敗");
    });
});
