// 教科書に定義済みのフィルタ関数
function filter(iterable: Iterable<number>, predicate: (n: number) => boolean): any {
    let iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() { return this; },
        next() {
            for (;;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        }
    };
}

// 整数列を返すジェネレータ
function* integerSequence(): Generator<number> {
    let n = 1;
    while (true) {
        yield n++;
    }
}

// 呼び出しごとに素数を順番に返す無限ジェネレータ
export function* primes(): Generator<number> {
    // 整数列を生成するジェネレータ
    let nums = integerSequence();
    nums.next(); // 1をスキップ

    // 2以降の素数を返す
    while (true) {
        // 現在の整数列の最初の要素は素数
        let prime = nums.next().value;
        yield prime;

        // 整数列からprimeの倍数を取り除く
        nums = filter(nums, n => n % prime !== 0);
    }
}

const gen = primes();
for (let i = 0; i < 10; i++) {
    console.log(gen.next().value);
}