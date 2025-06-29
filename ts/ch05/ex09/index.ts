export const parseJson = (jsonString: string): any => {
    try {
        return {success: true, data: JSON.parse(jsonString)};
    } catch (e: any) {
        return {success: false, error: e.message};
    }
}

console.log(parseJson('{"name": "John", "age": 30}')); // { success: true, data: { name: 'John', age: 30 } }
console.log(parseJson('{"name": "John", "age": 30')); // { success: false, error: 'Unexpected end of JSON input' }