/*
    元のコード:
    const args = [];
    function call() {
    args.push(Array.from(arguments));
    }

    call(1, 2, 3);
    call("A", "B");

    console.log(args[0]); // [1, 2, 3]
    console.log(args[1]); // ["A", "B"]
*/

const args: any[] = [];
function call(...x: any[]) {
  // args.push(Array.from(x));
  args.push(x); // スプレッド構文を使う場合はArray.fromは不要
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]
