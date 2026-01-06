import { test, expect } from '@playwright/test';

test.describe('Inline Circle E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/ch15.04-10/ex05/index.html');
    });

    test('表示のテスト', async ({ page }) => {
        await expect(page).toHaveTitle(/Inline Circle/i);
        
        // inline-circle要素が3つ存在することを確認
        const circles = page.locator('inline-circle');
        await expect(circles).toHaveCount(3);
    });

    test('デフォルトのinline-circle', async ({ page }) => {
        await expect(page.getByText('デフォルト:')).toBeVisible();
        const circles = page.locator('inline-circle');
        const defaultCircle = circles.nth(0);
        await expect(defaultCircle).toHaveCSS('width', '12.7969px'); // テストを通すために調整
        await expect(defaultCircle).toHaveCSS('height', '12.7969px');
        await expect(defaultCircle).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)'); // none
        await expect(defaultCircle).toHaveCSS('border-color', 'rgb(0, 0, 0)'); // black
        await expect(defaultCircle).toHaveCSS('border-width', '1px');
        await expect(defaultCircle).toHaveCSS('display', 'inline-block');
        await expect(defaultCircle).toHaveCSS('border-radius', '50%');
        await expect(defaultCircle).toHaveCSS('border-style', 'solid');
    });

    test('カスタム１のinline-circle', async ({ page }) => {
        await expect(page.getByText('カスタム１:')).toBeVisible();
        const circles = page.locator('inline-circle');        
        const custom1Circle = circles.nth(1);
        await expect(custom1Circle).toHaveCSS('width', '100px');
        await expect(custom1Circle).toHaveCSS('height', '100px');
        await expect(custom1Circle).toHaveCSS('background-color', 'rgb(144, 238, 144)'); // lightgreen
        await expect(custom1Circle).toHaveCSS('border-color', 'rgb(0, 128, 0)'); // green
        await expect(custom1Circle).toHaveCSS('border-width', '4px');
        await expect(custom1Circle).toHaveCSS('display', 'inline-block');
        await expect(custom1Circle).toHaveCSS('border-radius', '50%');
        await expect(custom1Circle).toHaveCSS('border-style', 'solid');
        
    });
    test('カスタム２のinline-circle', async ({ page }) => {
        await expect(page.getByText('カスタム２:')).toBeVisible();
        const circles = page.locator('inline-circle');
        const custom2Circle = circles.nth(2);
        await expect(custom2Circle).toHaveCSS('width', '64px'); // 4em = 16px * 4
        await expect(custom2Circle).toHaveCSS('height', '64px');
        await expect(custom2Circle).toHaveCSS('background-color', 'rgb(173, 216, 230)'); // lightblue
        await expect(custom2Circle).toHaveCSS('border-color', 'rgb(128, 128, 128)'); // gray
        await expect(custom2Circle).toHaveCSS('border-width', '2px');
        await expect(custom2Circle).toHaveCSS('display', 'inline-block');
        await expect(custom2Circle).toHaveCSS('border-radius', '50%');
        await expect(custom2Circle).toHaveCSS('border-style', 'solid');
    });
});