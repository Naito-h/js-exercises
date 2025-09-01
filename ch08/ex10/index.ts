export function addMyCall(fn: any): void {
  fn.myCall = function (context: any, ...args: any[]): any {
    const boundFn = fn.bind(context);
    return boundFn(...args);
  };
}
