export const unwritableAndUnconfigurableObj = (): any => {
    const obj = {};
    Object.defineProperty(obj, "a", {
        value: 1,
        writable: false,    // 書き込み不可
        enumerable: true,   // 列挙可能(表示できるようにする)
        configurable: false,    // 再定義・削除不可
    });
    return obj;
};

export const writableAndUnconfigurableObj = (): any => {
    const obj = {};
    Object.defineProperty(obj, "b", {
        value: 2,
        writable: true,     // 書き込み可能
        enumerable: true,   // 列挙可能
        configurable: false,    // 再定義・削除不可
    });
    return obj;
};

export const nestedUnwritableObj = (): any => {
    const obj: any = {};
    Object.defineProperty(obj, "c", {
        value: {},
        writable: false,    // 書き込み不可
        enumerable: true,   // 列挙可能
    });
    Object.defineProperty(obj.c, "d", {
        value: {},
        writable: false,    // 書き込み不可
        enumerable: true,   // 列挙可能
    });
    Object.defineProperty(obj.c.d, "e", {
        value: 3,
        writable: false,    // 書き込み不可
        enumerable: true,   // 列挙可能
    });
    // オブジェクトの拡張を禁止
    Object.preventExtensions(obj);
    Object.preventExtensions(obj.c);
    Object.preventExtensions(obj.c.d);
    return obj;
};
