export function modifyUrl({base, addQuery, path}: {base: string, addQuery?: string[][], path?: string}): string {
    
    // URL オブジェクトを作成
    const url = new URL(base);

    // path が指定されていれば、URL のパスを設定
    if (path) {
        url.pathname = path;
    }

    // addQuery が指定されていれば、各クエリパラメータを追加
    if (addQuery) {
        for (const [key, value] of addQuery) {
            url.searchParams.append(key, value);
        }
    }

    // 変更後の URL を文字列として返す
    return url.href;
}
