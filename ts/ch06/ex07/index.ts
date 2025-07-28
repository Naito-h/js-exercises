export const assign = (target: { [key: string|symbol]: any }, ...sources: { [key: string|symbol]: any }[]) => {

    // target が null または undefined の場合、TypeError を投げる
    if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
    }

    // target をオブジェクトに変換
    target = Object(target);

    for (let source of sources) {
        // source が null または undefined の場合、スキップ
        if (source == null) {
            continue;
        }

        // source の文字列プロパティをコピー
        for (const key of Object.keys(source)) {
            target[key] = source[key];
        }

        // source のシンボルプロパティをコピー
        for (const sym of Object.getOwnPropertySymbols(source)) {
            if (source.propertyIsEnumerable(sym)) {
                target[sym] = source[sym];
            }
        }
    }
    return target;
}

const obj1 = { a: 1 };
const obj2 = { b: 2, c: 3 };
const obj3 = { d: 4, e: 5, a: 6 };
console.log(assign(obj1, obj2, obj3)); // => { a: 6, b: 2, c: 3, d: 4, e: 5 }
console.log(assign({ foo: "foo", hello: "world" }, [
    123,
    true,
    ["aa", "bb", "cc"],
    null,
    undefined,
  ]));
// => {
//   '0': 123,
//   '1': true,
//   '2': [ 'aa', 'bb', 'cc' ],
//   '3': null,
//   '4': undefined,
//   foo: 'foo',
//   hello: 'world'
// }