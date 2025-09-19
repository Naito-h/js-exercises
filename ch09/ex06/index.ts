export class TypeMap {
    #map: Map<string, string>;
    #keyType: string;
    #valueType: string;

    // entriesが指定されている場合、型をチェックする
    constructor(keyType: string, valueType: string, entries: [string, string][] = []) {
        this.#map = new Map();
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new Error(`Wrong type for entry [${k}, ${v}]`);
                }
                this.#map.set(k, v);
            }
        }

        this.#keyType = keyType;
        this.#valueType = valueType;
    }

    // setメソッドをオーバーライドして型チェックする
    set(key: string, value: string): this {
        if (this.#keyType && typeof key !== this.#keyType) {
            throw new Error(`${key} is not of type ${this.#keyType}`);
        }
        if (this.#valueType && typeof value !== this.#valueType) {
            throw new Error(`${value} is not of type ${this.#valueType}`);
        }

        this.#map.set(key, value);
        return this;
    }

    get(key: string): string | undefined {
        return this.#map.get(key);
    }

    has(key: string): boolean {
        return this.#map.has(key);
    }

    delete(key: string): boolean {
        return this.#map.delete(key);
    }

    clear(): void {
        this.#map.clear();
    }

    get size(): number {
        return this.#map.size;
    }

    entries(): IterableIterator<[string, string]> {
        return this.#map.entries();
    }

    keys(): IterableIterator<string> {
        return this.#map.keys();
    }
    
    values(): IterableIterator<string> {
        return this.#map.values();
    }
}

const typemMap = new TypeMap("string", "string", [["one", "1"], ["two", "2"]]);
console.log(typemMap);
typemMap.set("three", "3");
console.log(typemMap);
