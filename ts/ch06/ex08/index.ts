// テンプレートオブジェクトに存在しないプロパティを、あるオブジェクトから削除する
export const restrict = (target: { [key: string]: any }, template: { [key: string]: any }) => {
    for (let key in target) {
        if (!(template.hasOwnProperty(key))) {
            delete target[key];
        }
    }
    return target;
}

// あるオブジェクトのすべてのプロパティを、別のオブジェクトから削除する
export const substract = (target: { [key: string]: any }, ...sources: { [key: string]: any }[]) => {
    for (let source of sources) {
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                delete target[key];
            }
        }
    }
    return target;
}

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };
const tempObj = { a: 0, b: 0 };
const parent = { parent: "parent" };

// テンプレートオブジェクトに存在しないプロパティを削除
console.log(restrict(obj1, tempObj)); // => { a: 1, b: 2 }
console.log(restrict({parent: "parent"}, Object.create(parent))); // => {}

// あるオブジェクトのすべてのプロパティを、別のオブジェクトから削除
console.log(substract(obj1, obj2, obj3)); // => { a: 1 }
console.log(substract({parent: "parent"}, {})); // => { parent: "parent" }