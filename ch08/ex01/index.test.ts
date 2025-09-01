import {displaynth, square, now} from './index.ts';

describe('displaynth Test', () => {
  test('通常ケース', () => {
    expect(displaynth(3, 'A')).toEqual(['A', 'A', 'A']);
    expect(displaynth(5, '1')).toEqual(['1', '1', '1', '1', '1']);
  });
  test('0回繰り返し', () => {
    expect(displaynth(0, 'Test')).toEqual([]);
  });
  test('空文字', () => {
    expect(displaynth(2, '')).toEqual(['', '']);
  });
});

describe('square Test', () => {
  test('正の整数', () => {
    expect(square(4)).toBe(16);
    expect(square(0)).toBe(0);
  });
  test('負の整数', () => {
    expect(square(-3)).toBe(9);
  });
  test('小数', () => {
    expect(square(2.5)).toBeCloseTo(6.25);
  });
  test('大きな数値', () => {
    expect(square(10000)).toBe(100000000);
  });
});

describe('now Test', () => {
  test('現在時刻の取得', () => {
    const result = now();
    const currentDate = new Date().toISOString();
    expect((result as any)["now"]).toBe(currentDate);
  });
});
