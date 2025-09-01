import { power } from './index.ts';

describe('power Test', () => {
  test('正の整数の累乗', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(3, 2)).toBe(9);
    expect(power(1, 5)).toBe(1);
  });
  test('負の整数の累乗', () => {
    expect(power(-2, 4)).toBe(16);
    expect(power(-5, 2)).toBe(25);
    expect(power(-10, 3)).toBe(-1000);
  });
  test('0乗', () => {
    expect(power(2, 0)).toBe(1);
    expect(power(3, 0)).toBe(1);
    expect(power(-5, 0)).toBe(1);
  });
  test('負の指数のエラー', () => {
    expect(() => power(2, -3)).toThrowError("正の整数を指定してください");
  });
});