import { wait1, wait2, wait3, log, logA, logB, logC, errX, errY } from "../wait.ts";

async function h1() {
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e: any) {
    log(e.message);
  }
}
// h1();
// 予想: 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
// 結果: 予想通り
// 理由: await は Promise が解決されるまで待機するため、各待機が順番に行われる。
// そのため、wait3 の後に logA が実行され、次に wait2 の後に logB が実行され、最後に wait1 の後に logC が実行される。

function h2() {
  // NOTE: h3 との比較用
  new Promise(() => {
    errX();
  }).catch((e: any) => log(e.message));
}
// h2();
// 予想: 即座に errX の例外メッセージが出力される。
// 結果: 予想通り
// 理由: Promise の中で即座に例外が発生し、その例外は catch ブロックで捕捉されるため。

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errX();
  }).catch((e: any) => log(e.message));
}
// h3();
// 予想: 即座に errX の例外メッセージが出力される。
// 結果: errX の例外メッセージは出力されず、X のエラーログが出力される
// 理由: Promise に async function を渡すと、その関数内で発生した例外は新しい Promise のreject になる。
// 元の Promise は、関数の戻り値を無視するため、reject されない。
// そのため、.catch() は呼ばれず、エラーダイアログとして出力された。

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e: any) {
    log(e.message);
  }
}
h4();
// 予想: 2秒後に errX の例外メッセージが出力され、その後1秒後に errY の例外メッセージが出力される。
// 結果: 1秒後に Y のエラーログが出力される。X の例外メッセージは出力されない。
// 理由: p1 と p2 の両方が並行して実行されるが、
// 1秒後に Y の例外が発生し catch ブロックで捕捉され、処理が終了するため。