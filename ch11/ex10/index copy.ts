// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDays(year: number, month: number): number {
    // monthが1から12の間でない場合はエラーを投げる
    if (month < 1 || month > 12) {
        throw new Error("monthは1から12の間で指定してください");
    }

    // 引数の年と月から開始の日付と終了の日付を作成し、その差分から日数を計算
    return new Date(year, month, 0).getDate();
}

console.log(getDays(2023, 1)); // 31
console.log(getDays(2023, 2)); // 28
console.log(getDays(2023, 11)); // 30

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function getBusinessDays(startDate: string, endDate: string): number {
    // 引数の日付から開始日と終了日を作成
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 日付が不正な場合はエラーを投げる
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("不正な日付です");
    }

    // 開始日が終了日より後の場合はエラーを投げる
    if (start > end) {
        throw new Error("開始日は終了日より前の日付を指定してください");
    }

    // 開始日から終了日までの日数をループし、土日以外の日数をカウント
    let count = 0;
    let current = new Date(start);
    while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count;
}

console.log(getBusinessDays("2025-01-01", "2025-01-31")); // 23
console.log(getBusinessDays("2025-01-01", "2025-12-31")); // 261

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getLocaleDayOfWeek(date: string, locale: string): string {
    // 引数の日付から Date オブジェクトを作成
    const newDate = new Date(date);

    // 日付が不正な場合はエラーを投げる
    if (isNaN(newDate.getTime())) {
        throw new Error("不正な日付です");
    }

    // ロケールに応じた曜日の名前を取得
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    const dayName = formatter.format(newDate);
    return dayName;
}

console.log(getLocaleDayOfWeek("2025-01-01", "ja-JP")); // 水曜日
console.log(getLocaleDayOfWeek("2025-12-25", "en-US")); // Thursday

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getLastMonthFirstDate(): Date {
    // 現在の日時を取得
    const now = new Date();

    // 現在の日時をロケールの形式の文字列に変換
    const nowString = now.toLocaleString();

    // 文字列を分割して年、月、日を取得し、先月の1日の日付オブジェクトを作成
    const [year, month, _day] = nowString.split(" ")[0].split("/").map(Number);
    const lastMonth = month === 1 ? 12 : month - 1;
    const lastMonthYear = month === 1 ? year - 1 : year;
    return new Date(Date.UTC(lastMonthYear, lastMonth - 1, 1, 0, 0, 0));
}

console.log(getLastMonthFirstDate()); // 2025-08-01T00:00:00.000Z
