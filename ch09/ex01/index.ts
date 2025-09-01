export class C {
    // staticメソッド
    static method() {
        return 1;
    }

    // インスタンスメソッド
    method() {
        return 2;
    }

    // staticクラス
    static C = class {
        // staticクラスのstaticメソッド
        static method() {
            return 3;
        }

        // staticクラスのインスタンスメソッド
        method() {
            return 4;
        }
    };
    
    // インスタンスクラス
    C = class {
        // インスタンスクラスのstaticメソッド
        static method() {
            return 5;
        }

        // インスタンスクラスのインスタンスメソッド
        method() {
            return 6;
        }
    };
}

console.log(C.method()); // 1
console.log(new C().method()); // 2
console.log(C.C.method()); // 3
console.log(new C.C().method()); // 4
console.log(new C().C.method()); // 5
console.log(new new C().C().method()); // 6
