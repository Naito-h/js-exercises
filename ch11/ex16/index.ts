export function retryWithExponentialBackoff(func: () => boolean, maxRetry: number, callback: (bool: boolean) => void): void {
    let retryCount = 0; // リトライ回数
    let delay = 1000; // 1000ミリ秒（1秒）

    const attempt = () => {

        // func を実行して成功したら callback を呼んで終了
        if (func()) {
            callback(true);
            return;
        }

        // 最大リトライ回数に達したら callback を呼んで終了
        if (retryCount >= maxRetry) {
            callback(false);
            return;
        }

        // 指定した遅延時間後に再試行
        setTimeout(() => {
            retryCount++;
            delay *= 2; // 次の遅延時間を2倍にする
            attempt();
        }, delay);
    };

    attempt();
}

// retryWithExponentialBackoff(() => {
//     console.log("処理を実行");
//     return false;
// }, 5, (result) => {
//     console.log("結果:", result);
// });

