import { wait1, wait2, wait3, log, logA, logB, logC, errX, errY } from "../wait.ts";

async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}
// i1();
// 予想: 1秒後に 42 が出力され、その後1秒後に 100 が出力される。
// 結果: 予想通り
// 理由: Promise.any は最初に解決された Promise の値を返す。
// wait1 が最初に解決されるため、v は 42 になる。
// その後、wait2 が解決され、v は 100 に更新されるため、2秒後に 100 が出力される。

async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}
// i2();
// 予想: 1秒後に C が出力され、その後1秒後に B が出力され、その後1秒後に A が出力され、最後に [ 'A', 'B', 'C' ] が出力される。
// 結果: 予想通り
// 理由: Promise.all はすべての Promise が解決されるまで待機し、すべての結果を配列として返すため、
// すべての処理が完了した後に log(v) が実行される。

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e: any) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}
// i3();
// 予想: 1秒後に Y と 42 が出力され、その後3秒後に 0 が出力される。
// 結果: 1秒後に Y と 42 が出力され、その1秒後に B が出力され、その後2秒後に 0 が出力される。
// 理由: Promise.all は1つでも失敗した Promise があると即座に reject される。
// wait1 が最初に失敗し、errY の例外がキャッチされる。
// その後、catch ブロック内で Y と 42 が出力され、2つ目の wait3 の完了を待つ。
// wait2 は並行して実行されているため、B が出力される。
// 1つ目の wait3 で v が 0 に更新されるが、errX は無視される。
// 最後に 2つ目の wait3 が完了した後に 0がログに出力される。

async function i4() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
// i4();
// 予想: 11秒後に 5 が出力される。
// 結果: 11秒後に 5 が出力される。
// 理由: p1 と p2 が1秒差で実行され、両方が v の値を読み込み、更新している。
// await により各ループでの読み込みと書き込みの間に 2秒の遅延が発生するため、
// 書き込み前の値を読み取ることで、互いの更新が失われ、最終的に v は 5 になった。

// 修正後
// 読み込みと書き込みの間に await を入れないようにし、読み込みと書き込みを同時に行うように修正した。
async function i4_fixed() {
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      await wait2();
      v++; // 読み込みと書き込みの間に await を入れない
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      await wait2();
      v++; // 読み込みと書き込みの間に await を入れない
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
// i4_fixed();
