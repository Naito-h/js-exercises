import { any, catching } from "./index.ts";

describe('any test', () => {
  it('すべての関数が false を返す場合は false を返す', () => {
    const isNonZero = any(
      (n: number) => n > 0,
      (n: number) => n < 0
    );
    expect(isNonZero(0)).toBe(false);
  });

  it('いずれかの関数が true を返す場合は true を返す', () => {
    const isNonZero = any(
      (n: number) => n > 0,
      (n: number) => n < 0
    );
    expect(isNonZero(42)).toBe(true);
  });

  it('いずれかの関数が true を返す場合は true を返す', () => {
    const isNonZero = any(
      (n: number) => n > 0,
      (n: number) => n < 0
    );
    expect(isNonZero(-0.5)).toBe(true);
  });
});

describe('catching test', () => {
  it('1つ目の関数がエラーにならない場合はその結果を返す', () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
  });

  it('1つ目の関数がエラーになる場合は、1つ目の関数で発生した例外を2つ目の関数の引数として処理し結果を返す', () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse('{Invalid Json}')).toEqual({ error: 'SyntaxError: Unexpected token I in JSON at position 1' });
  });
});
