export function addMyCall(fn: any): void {
  fn.myCall = function (context: any, ...args: any[]): any { // myCallメソッドを定義
    const boundFn = fn.bind(context); // contextにバインドした関数を作成
    return boundFn(...args); // 引数を展開して関数を呼び出す
  };
}
