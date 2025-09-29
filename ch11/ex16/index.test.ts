import { retryWithExponentialBackoff } from "./index.ts";

describe("retryWithExponentialBackoff", () => {
    jest.setTimeout(40000); // タイムアウトを40秒に設定（デフォルトは5秒）

    test("func が true になる場合", async () => {
        let attemptCount = 0;
        const func = () => {
            attemptCount++;
            return attemptCount === 3;
        };

        const result = await new Promise<boolean>((resolve) => {
            retryWithExponentialBackoff(func, 5, resolve);
        });

        expect(result).toBe(true);
        expect(attemptCount).toBe(3);
    });
    test("func が一度も true にならない場合", async () => {
        let attemptCount = 0;
        const func = () => {
            attemptCount++;
            return false;
        };

        const result = await new Promise<boolean>((resolve) => {
            retryWithExponentialBackoff(func, 5, resolve);
        });

        expect(result).toBe(false);
        expect(attemptCount).toBe(6); // 最初の試行 + 5回のリトライ
    });
    test("maxRetry が 0 の場合", async () => {
        let attemptCount = 0;
        const func = () => {
            attemptCount++;
            return false;
        };

        const result = await new Promise<boolean>((resolve) => {
            retryWithExponentialBackoff(func, 0, resolve);
        });
        expect(result).toBe(false);
        expect(attemptCount).toBe(1);
    });
});

