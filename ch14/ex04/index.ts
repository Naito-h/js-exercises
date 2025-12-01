export class Hiragana {
    char: string;   // ひらがな1文字
    code: number;   // ひらがなのUTF-16 コード単位
    
    constructor(char: string) {
        // 1文字でない場合はエラー
        if (char.length !== 1) {
            throw new Error("1文字のみ指定してください。");
        }

        // ひらがなでない場合はエラー
        if (char < "あ" || char > "ん") {
            throw new Error("ひらがなを指定してください。");
        }

        // プロパティを初期化
        this.char = char;
        this.code = char.charCodeAt(0);
    }

    // Symbol.toPrimitive で型変換を制御
    [Symbol.toPrimitive](hint: string) {
        switch (hint) {
            case "number":
                return this.code;
            case "string":
            default:
                return this.char;
        }
    }
}

const a = new Hiragana("あ");
console.log(`String: ${a}`);
console.log(`Number: ${Number(a)}`);
console.log(`Default: ${a + ""}`);