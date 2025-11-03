export async function retryWithExponentialBackoff<T>(func: () => Promise<T>, maxRetry: number) {
    let retryCount = 0; // リトライ回数
    let delay = 1000; // 1000ミリ秒（1秒）

    return new Promise<T>((resolve, reject) => {
        const attempt = async () => {
            await func()
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    // 最大リトライ回数に達したら reject を呼んで終了
                    if (retryCount >= maxRetry) {
                        reject(error);
                        return;
                    }
                    retryCount++;
                    delay *= 2; // 次の遅延時間を2倍にする
                    setTimeout(attempt, delay);
                });
        };
        attempt();
    });
}

// // 成功する関数
// async function fetchData(): Promise<string> {
//     console.log("データを取得中...");
//     return "OK";
// }

// retryWithExponentialBackoff(fetchData, 5) // 失敗したら最大5回再試行
//     .then((result) => {
//         console.log("成功:", result);
//     })
//     .catch((err) => {
//         console.error("失敗:", err);
//     });

// // 失敗する関数
// async function fetchDataWithError(): Promise<string> {
//     console.log("データを取得中...");
//     throw new Error("取得失敗");
// }

// retryWithExponentialBackoff(fetchDataWithError, 5) // 失敗したら最大5回再試行
//     .then((result) => {
//         console.log("成功:", result);
//     })
//     .catch((err) => {
//         console.error("失敗:", err);
//     });
