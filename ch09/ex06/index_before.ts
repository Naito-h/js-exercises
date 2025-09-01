class TypeMap extends Map<string, string> {
    keyType: string;
    valueType: string;

    // entriesが指定されている場合、型をチェックする
    constructor(keyType: string, valueType: string, entries: [string, string][] = []) {
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new Error(`Wrong type for entry [${k}, ${v}]`);
                }
            }
        }

        // entriesを使って、スーパークラスを初期化する
        super(entries);

        // 型を保存して、サブクラスを初期化する
        this.keyType = keyType;
        this.valueType = valueType;
    }

    // setメソッドをオーバーライドして型チェックする
    set(key: string, value: string): this {
        if (this.keyType && typeof key !== this.keyType) {
            throw new Error(`${key} is not of type ${this.keyType}`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new Error(`${value} is not of type ${this.valueType}`);
        }

        // 型チェックを通過したら、スーパークラスのsetを呼び出す
        return super.set(key, value);
    }
}
