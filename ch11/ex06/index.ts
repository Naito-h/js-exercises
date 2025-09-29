export function isEmailAddress(s: any): boolean {
    if (typeof s !== "string") {
        return false;
    }

    // 文字数
    if (s.length > 254) return false;

    // @ が1つだけ含まれていること
    const a = [...s.matchAll(/^(.+)@(.+)$/g)][0];
    if (!a) return false;

    const [_, localPart, domain] = a;
    if (localPart.length > 64 || domain.length > 253) return false;

    // local-partのチェック
    const localRegExp = /^[a-zA-Z0-9._%+!#$%&'*+/=?^`{|}~-]+$/
    if (!localPart.match(localRegExp)) return false;

    // domainのチェック
    const domainRegExp = /^[a-zA-Z0-9._%+!#$%&'*+/=?^`{|}~-]+$/
    if (!domain.match(domainRegExp)) return false;

    // 連続するドットは不可
    if (/\.{2,}/.test(localPart) || /\.{2,}/.test(domain)) return false;

    // 先頭および末尾にドットは不可
    if (/^\./.test(localPart) || /^\./.test(domain)) return false;
    if (/\.$/.test(localPart) || /\.$/.test(domain)) return false;

    return true;
}