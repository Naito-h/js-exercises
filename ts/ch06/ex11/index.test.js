import { polarCoordinates } from './index.ts'; // ファイルパスに応じて修正してください

describe('polarCoordinates', () => {
    beforeEach(() => {
        // 初期状態にリセット
        polarCoordinates.r = 2;
        polarCoordinates.theta = Math.PI / 2;
    });

    test('initial x and y values are correct', () => {
        expect(polarCoordinates.x).toBeCloseTo(0);
        expect(polarCoordinates.y).toBeCloseTo(2);
    });

    test('setting y updates r and theta correctly', () => {
        polarCoordinates.y = 1;
        expect(polarCoordinates.y).toBeCloseTo(1);
        expect(polarCoordinates.x).toBeCloseTo(0); // x remains unchanged
        expect(polarCoordinates.r).toBeCloseTo(Math.hypot(0, 1));
        expect(polarCoordinates.theta).toBeCloseTo(Math.atan2(1, 0));
    });

    test('setting x with non-number throws error', () => {
        expect(() => {
            polarCoordinates.x = 'invalid';
        }).toThrow("must be a number");
    });

    test('setting y with non-number throws error', () => {
        expect(() => {
            polarCoordinates.y = null;
        }).toThrow("must be a number");
    });
});
