import { wait, wait1, wait2, wait3, log, logA, logB, logC, errX, errY } from "../wait.ts";

function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}
// f3();
// 予想: 0秒後に A が出力され、その直後に C が出力され、errX の例外はキャッチされずに未処理のままになる。
// 結果: C が最初に出力され、その直後に A が出力され、数秒後に未処理の例外としてエラーメッセージが表示される。
// 理由: wait(0).then(...) の呼び出しは非同期に実行されるため、try ブロック内で発生した例外は catch ブロックでキャッチできない。
// finally ブロックは Promise の解決を待たずに直ちに実行されるため、最初に C が出力される。

function f4() {
  // NOTE: f5 との比較用
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}
// f4();
// 予想: 2秒後に A が出力され、その1秒後に B が出力され、さらに1秒後に 100 が出力される。
// 結果: 2秒後に A が出力され、その1秒後に B が出力され、直後に 100 が出力される。
// 理由: 2秒後に最初の then が実行され A が出力される。
// その後 return された Promise が解決されるのを待ち、1秒後に B が出力され 100 が返される。
// 最後に log に 100 が渡され出力される。

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    // この部分がエラーになるので、index.jsで実行した
    // .then(
    //   wait1().then(() => {
    //     logB();
    //     return 100;
    //   })
    // )
    .then((v) => log(v));
}
// f5();
// 予想: 1秒後に B が出力され、その1秒後に A が出力され、さらにその直後に 40 が出力される。
// 結果: 1秒後に B が出力され、その1秒後に A が出力され、さらにその直後に 40 が出力される。
// 理由: 2つ目の then の引数が Promise であるため、wait1().then(...) が即座に実行され、1秒後に B が出力される。
// その後最初の then が解決され、1秒後に A が出力される。（開始から2秒後）
// 最後に log に 40 が渡され出力される。

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか

  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}
// f6();
// 予想: 1秒後に A が出力され、その1秒後に B が出力され、さらに2秒後に C が出力される。
// 結果: 1秒後に A が出力され、その1秒後に B が出力され、さらに1秒後に C が出力される。
// 理由: p は wait1().then(logA) の返す Promise であり、1秒後に解決される。
// p に対して呼び出された then は全て p の解決を待ってから並列で実行される。
// したがって、最初に A が出力され、その1秒後に B が出力され、さらに1秒後に C が出力される。

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}
// f7();
// 予想: 1秒後に A が出力され、その1秒後に B が出力され、その直後に C が出力される。
// 結果: 予想通り。
// 理由: 始めに wait1 が実行され、A が出力される。
// 2つ目の wait の引数が実行される際には p は解決済みであるため、1秒後に B が出力され、その直後に C が出力される。

function f8() {
  // NOTE: f9, f10 との比較用
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}
// f8();
// 予想: 1秒後に X のエラーメッセージが出力され、その直後に A が出力される。
// 結果: 予想通り。
// 理由: wait1 が解決された後、最初の then の中で errX が呼び出され例外が発生する。
// この例外は次の then には渡されず、catch ブロックでキャッチされる。
// catch ブロック内でエラーメッセージが出力された後、finally ブロックが実行され A が出力される。

function f9() {
  // NOTE: f10 との比較用
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}
// f9();
// 予想: 1秒後に Y のエラーメッセージが出力され、その直後に A が出力される。
// 結果: 予想通り。
// 理由: wait1 が解決された後、最初の then の中で 42 が返される。
// 次の then の中で errY が呼び出され例外が発生する。
// この例外は catch ブロックでキャッチされ、エラーメッセージが出力された後、finally ブロックが実行され A が出力される。

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}
// f10();
// 予想: 1秒後に A が出力されるのみ。
// 結果: 1秒後に A が出力され、その直後にエラーメッセージが出力される。
// 理由: wait1 が解決された後、最初の then の中で 42 が返される。
// 次の then の中で errY が呼び出され例外が発生する。
// しかし、then の第2引数はこの例外をキャッチしないため、catch ブロックは実行されずに finally ブロックが実行され A が出力される。
// その後、未処理の例外としてエラーメッセージが表示される。

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}
// f11();
// 予想: 直後に X が出力される。
// 結果: 予想通り。
// 理由: new Promise のコールバック関数内で errX が呼び出され例外が発生する。
// この例外は Promise の reject として扱われ、catch ブロックでキャッチされ X が出力される。

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}
// f12();
// 予想: 直後にエラーメッセージが表示される。
// 結果: 直後に未処理の例外としてエラーメッセージが表示される。
// 理由: setTimeout のコールバック関数内で errX が呼び出され例外が発生する。
// この例外は new Promise のコールバック関数のスコープ外で発生するため、catch ブロックではキャッチされずに未処理のままになる。
