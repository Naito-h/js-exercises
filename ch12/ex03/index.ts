// throw()を使ってリセットを行うカウンタのようなジェネレータ
export function* resetCounter() {
    let count = 0;
    while (true) {
        try {
            count++;
            yield count;
        } catch (e) {
            count = 0;
            yield count;
            console.log("Reset counter");
        }
    }
}

const counter = resetCounter();
console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next().value);
counter.throw(new Error("reset"));
console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next().value);