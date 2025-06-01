const text = `The quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog.\r\nThe quick brown fox jumps over the lazy dog.`;
const text2 = `The quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog.`;
const text3 = `The quick brown fox jumps over the lazy dog.\r\nThe quick brown fox jumps over the lazy dog.\r\nThe quick brown fox jumps over the lazy dog.`;


export const lfToCrLf = (text: string): string => {
    return text.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
};

export const crLfToLf = (text: string): string => {
    return text.replace(/\r\n/g, '\n');
};

console.log('LF to CRLF:');
console.log(lfToCrLf(text));
console.log(lfToCrLf(text) === text3);
console.log('CRLF to LF:');
console.log(crLfToLf(lfToCrLf(text)));
console.log(crLfToLf(text) === text2);