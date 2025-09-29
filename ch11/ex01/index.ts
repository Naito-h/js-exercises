export class TypeMap {
    #map: Map<Function, any> = new Map();

    get(key: Function): any {
        return this.#map.get(key);
    }
    
    set(key: Function, value: any): void {
        if (key === String) {
            // keyがStringで、valueがstring型でなければエラー
            if (typeof value !== "string") throw new Error("Type mismatch");
        } else if (key === Number) {
            // keyがNumberで、valueがnumber型でなければエラー
            if (typeof value !== "number") throw new Error("Type mismatch");
        } else if (key === Boolean) {
            // keyがBooleanで、valueがboolean型でなければエラー
            if (typeof value !== "boolean") throw new Error("Type mismatch");
        } else if (key === Date) {
            // keyがDateで、valueがDate型でなければエラー
            if (!(value instanceof Date)) throw new Error("Type mismatch");
        } else if (typeof key === "function") {
            // keyがクラスで、valueがそのクラスのインスタンスでなければエラー
            if (!(value instanceof key)) throw new Error("Type mismatch");
        } else {
            // その他の場合はエラー
            throw new Error("Unsupported key type");
        }
        this.#map.set(key, value);
    }
}

class Foo {}

const typeMap = new TypeMap();
typeMap.set(String, "string");
typeMap.set(Number, 123);
typeMap.set(Foo, new Foo());
// typeMap.set(Date, "not a date"); // -> Error

console.log(typeMap.get(String)); // -> "string"
console.log(typeMap.get(Number)); // -> 123
console.log(typeMap.get(Foo)); // -> Foo {}
