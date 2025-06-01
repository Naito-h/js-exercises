const hundredPointsSymbol = "💯";

// lengthの値を表示
console.log(`length of ${hundredPointsSymbol}: ${hundredPointsSymbol.length}`);

// utf-16とutf-32の表現が同じであることを確認
const utf16 = "\uD83D\uDCAF";
const utf32 = "\u{0001F4AF}";
console.log(`utf-16: ${utf16 === hundredPointsSymbol}`);
console.log(`utf-32: ${utf32 === hundredPointsSymbol}`);