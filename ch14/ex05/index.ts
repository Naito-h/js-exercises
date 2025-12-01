export function template(strings: TemplateStringsArray, ...values: any[]): string {
    // 一番左の文字列を取得
    let result = strings[0];

    // values 配列の各要素について処理
    for (let i = 0; i < values.length; i++) {
        // values[i] の型名と右側の文字列を連結
        result += typeof values[i] + strings[i + 1];
    }
    
    return result;
}

// NOTE: 以下の例では template という関数を作成したものとしている:

console.log(template``); // ""
console.log(template`test`); // "test"
console.log(template`Hello, ${"A"}`); // "Hello, string"
console.log(template`${1} ${null} ${() => {}}`); // "number object function"
console.log(template`type of 'A' is ${"A"}`); // "type of 'A' is string"
