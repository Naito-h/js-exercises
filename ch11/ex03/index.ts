// リトルエンディアンの Uint32Array をビッグエンディアンに変換する関数
export function littleEndianToBigEndian(uint32Array: Uint32Array): Uint32Array {
    // 引数の Uint32Array から DataView オブジェクトを作成
    const view = new DataView(uint32Array.buffer, uint32Array.byteOffset, uint32Array.byteLength);

    // 結果を格納するための DataView を作成
    const resultView = new DataView(new ArrayBuffer(uint32Array.byteLength));

    // 各要素を変換
    for (let i = 0; i < uint32Array.length; i++) {
        const value = view.getUint32(i * 4, true); // リトルエンディアンとして読み込む
        resultView.setUint32(i * 4, value, false); // ビッグエンディアンとして書き込む
    }
    return new Uint32Array(resultView.buffer);
}

// ビッグエンディアンの Uint32Array をリトルエンディアンに変換する関数
export function bigEndianToLittleEndian(uint32Array: Uint32Array): Uint32Array {
    // 引数の Uint32Array から DataView オブジェクトを作成
    const view = new DataView(uint32Array.buffer, uint32Array.byteOffset, uint32Array.byteLength);
    
    // 結果を格納するための DataView を作成
    const resultView = new DataView(new ArrayBuffer(uint32Array.byteLength));

    // 各要素を変換
    for (let i = 0; i < uint32Array.length; i++) {
        const value = view.getUint32(i * 4, false); // ビッグエンディアンとして読み込む
        resultView.setUint32(i * 4, value, true); // リトルエンディアンとして書き込む
    }
    return new Uint32Array(resultView.buffer);
}

// 動作確認用の16進数表示関数
function toHex32(value: number): string {
    return '0x' + (value >>> 0).toString(16).padStart(8, '0');
}

const littleEndianArray = new Uint32Array([0x12345678, 0x9abcdef0]);
console.log(Array.from(littleEndianArray).map(toHex32).join(',')); // Expected: "0x12345678,0x9abcdef0"

const bigEndianArray = littleEndianToBigEndian(littleEndianArray);
console.log(Array.from(bigEndianArray).map(toHex32).join(',')); // Expected: "0x78563412,0xf0debc9a"

const convertedBack = bigEndianToLittleEndian(bigEndianArray);
console.log(Array.from(convertedBack).map(toHex32).join(',')); // Expected: "0x12345678,0x9abcdef0"
