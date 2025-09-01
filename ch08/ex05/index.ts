export const sequenceToObject = (...values: any): object => {
    const result = Object.create(null);
    if (values.length % 2 !== 0) {
        throw new Error("引数は偶数個でなければなりません");
    }
    for (let i = 0; i < values.length; i += 2) {
        if (typeof values[i] !== 'string') {
            throw new Error("キーは文字列でなければなりません");
        }
        const key = values[i];
        const value = values[i + 1];
        result[key] = value;
    }
    return result;
};

console.log(sequenceToObject("name", "Alice", "age", 30)); // { name: 'Alice', age: 30 }
console.log(sequenceToObject("city", "Tokyo", "country", "Japan")); // { city: 'Tokyo', country: 'Japan' }
// console.log(sequenceToObject("key1", "value1", 42, "value2")); // Error: キーは文字列でなければなりません
// console.log(sequenceToObject("key1", "value1", "key2")); // Error: 引数は偶数個でなければなりません