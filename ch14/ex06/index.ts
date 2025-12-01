export function makeProxyAndLogs(obj: any): [any, any[]] {
    let logs: any[] = [];
    let proxy = new Proxy(obj, {
        get(target, prop, receiver) {
            // 元のプロパティ値を取得
            const value = Reflect.get(target, prop, receiver);

            // 関数の場合は呼び出しを記録する関数を返す
            if (typeof value === "function") {
                // 呼び出しを記録して元の関数を呼び出す関数を返す
                return function (...fnArgs: any[]) {
                    logs.push({ name: String(prop), args: fnArgs, timestamp: Date.now() });
                    return value.apply(target, fnArgs);
                };
            }

            // それ以外の場合はそのまま返す
            return value;
        }
    });
    
    return [proxy, logs];
}

// NOTE: 以下の例では makeProxyAndLogs という関数を作成したものとしている:

const a = {
  p: 1,
  f: (x: number, y: number) => {
    return x + y;
  },
};

const [proxy, logs] = makeProxyAndLogs(a);

console.log(logs); // []
console.log(proxy.p); // 1
console.log(proxy.f(1, 2)); // 3
console.log(logs); // [ { name: 'f', args: [ 1, 2 ], timestamp: ... } ]
