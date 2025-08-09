const str1 = "123abc";
const str2 = "𠮷野家";
const str3 = "家族 👨‍👨‍👧‍👧";

export const reverse = (str: string): string => {
    const segmenter = new Intl.Segmenter("ja-JP", { granularity: "grapheme" });
    const segments = Array.from(segmenter.segment(str));
    return segments.reverse().map(seg => seg.segment).join("");
};

console.log(reverse(str1)); // "cba321"
console.log(reverse(str2)); // "家野𠮷"
console.log(reverse(str3)); // "👨‍👨‍👧‍👧 族家"