const equals = (o1: any, o2: any): boolean => {
    // 厳密等価なら true
    if (o1 === o2) {
        return true;
    }
    // nullまたはオブジェクト以外が指定されたら false
    if (o1 === null || o2 === null || typeof o1 !== 'object' || typeof o2 !== 'object') {
        return false;
    }
    // プロパティの数と名前が一致しなければ false
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
    }
    // プロパティの各値を比較して、1つでも違う場合は false
    for (const key of keys1) {
        if (!equals(o1[key], o2[key])) {
            return false;
        }
    }
    return true;
}

// テストケースの結果を出力
console.log(equals(42, 42)); // true
console.log(equals(null, null)); // true
console.log(equals({ x: 42 }, 42)); // false
console.log(equals(null, { x: 42 })); // false
console.log(equals({ x: 1 }, { y: 1 })); // false
console.log(equals({ x: 1 }, { x: 1, y: 1 })); // false
console.log(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })); // true
console.log(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })); // false