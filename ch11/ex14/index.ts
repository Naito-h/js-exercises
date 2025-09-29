// 日本語文字列の配列を受け取り、文字列中の大文字・小文字、濁点・半濁点の違いを無視してソートする関数
export function sortJapanese(arr: string[]): string[] {
    const collator = new Intl.Collator("ja", { sensitivity: "base" }).compare;
    return arr.sort(collator);
}

console.log(sortJapanese(["い", "あ", "え", "お", "う"])); // ["あ", "い", "う", "え", "お"]
console.log(sortJapanese(["が", "ざ", "か", "だ", "さ"])); // ["が", "か", "ざ", "さ", "だ"]
console.log(sortJapanese(["ばなな", "りんご", "かき", "ぶどう", "みかん"])); // ["かき", "ばなな", "ぶどう", "みかん", "りんご"]

// Date オブジェクトを受け取り、(和暦)y年m月d日 のフォーマットで日付の文字列を返す関数
export function toJapaneseDate(date: Date): string {
    const collator = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
        era: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format;
    return collator(date);
}

console.log(toJapaneseDate(new Date("1964-07-01"))); // 昭和39年7月1日
console.log(toJapaneseDate(new Date("1999-09-14"))); // 平成11年9月14日
console.log(toJapaneseDate(new Date("2024-04-02"))); // 令和6年4月2日