export function instanceOf(object: any, constructor: Function): boolean {
    if (object == null || typeof object !== "object") {
        return false;
    }
    let proto = Object.getPrototypeOf(object);
    while (proto) {
        if (proto === constructor.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};

// クラスの定義
class A { }
class B extends A { }
class C extends B { }
class D { }

// インスタンスの生成
const a = new A();
const b = new B();
const c = new C();
const d = new D();

// Aのインスタンス
console.log(instanceOf(a, A)); // true
console.log(instanceOf(a, B)); // false
console.log(instanceOf(a, C)); // false
console.log(instanceOf(a, D)); // false

// Bのインスタンス
console.log(instanceOf(b, A)); // true
console.log(instanceOf(b, B)); // true
console.log(instanceOf(b, C)); // false
console.log(instanceOf(b, D)); // false

// Cのインスタンス
console.log(instanceOf(c, A)); // true
console.log(instanceOf(c, B)); // true
console.log(instanceOf(c, C)); // true
console.log(instanceOf(c, D)); // false

// Dのインスタンス
console.log(instanceOf(d, A)); // false
console.log(instanceOf(d, B)); // false
console.log(instanceOf(d, C)); // false
console.log(instanceOf(d, D)); // true