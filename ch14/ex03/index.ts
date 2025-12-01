export class IgnoreAccentPattern {
    pattern: string | RegExp;

    constructor(pattern: string | RegExp) {
        if (typeof pattern === "string") {
            // ダイアクリティカルマークを除去して保存
            this.pattern = pattern.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        } else {
            // 正規表現の場合も同様にダイアクリティカルマークを除去して保存
            const source = pattern.source.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            this.pattern = new RegExp(source, pattern.flags);
        }
    }

    // Symbol.search でsearchメソッドを実装
    [Symbol.search](s: string) {
        // ダイアクリティカルマークを除去して検索
        s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return s.search(this.pattern);
    }

    // Symbol.match でmatchメソッドを実装
    [Symbol.match](s: string) {
        // ダイアクリティカルマークを除去して検索
        s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return s.match(this.pattern);
    }
}