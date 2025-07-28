import { PolarCoordinates } from './index.ts';

describe('PolarCoordinates', () => {
    test('初期化時にrとthetaからxとyを正しく計算する', () => {
        const point = new PolarCoordinates(1, Math.PI / 4);
        const expectedX = point.r * Math.cos(point.theta);
        const expectedY = point.r * Math.sin(point.theta);
        expect(point.x).toBeCloseTo(expectedX);
        expect(point.y).toBeCloseTo(expectedY);
    });

    test('xを設定するとrとthetaが更新される', () => {
        const point = new PolarCoordinates(1, Math.PI / 4);
        point.x = 2;
        
        const expectedY = point.r * Math.sin(point.theta); // 更新後の y を計算
        expect(point.y).toBeCloseTo(expectedY);
        expect(point.r).toBeCloseTo(Math.hypot(2, expectedY));
        expect(point.theta).toBeCloseTo(Math.atan2(expectedY, 2));
    });

    test('yを設定するとrとthetaが更新される', () => {
        const point = new PolarCoordinates(1, Math.PI / 4);
        point.y = 2;
        const expectedX = point.r * Math.cos(point.theta); // 更新後の x を計算
        expect(point.x).toBeCloseTo(expectedX);
        expect(point.r).toBeCloseTo(Math.hypot(expectedX, 2));
        expect(point.theta).toBeCloseTo(Math.atan2(2, expectedX));
    });

    test('xにNaNを設定するとエラー', () => {
        const point = new PolarCoordinates(1, Math.PI / 4);
        expect(() => { point.x = NaN; }).toThrow("must be a number");
    });

    test('yにNaNを設定するとエラー', () => {
        const point = new PolarCoordinates(1, Math.PI / 4);
        expect(() => { point.y = NaN; }).toThrow("must be a number");
    });

    test('初期化時にNaNを渡すとエラー', () => {
        expect(() => new PolarCoordinates(NaN, 0)).toThrow("r and theta must be numbers");
        expect(() => new PolarCoordinates(1, NaN)).toThrow("r and theta must be numbers");
    });
});
