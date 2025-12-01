import { expect, test } from "@playwright/test";

test.describe('Import Test (ex03) E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/ch15.01-03/ex03/index.html');
    });

    test('初期表示のテスト', async ({ page }) => {
        await expect(page).toHaveTitle(/Import Test/i);
        await expect(page.locator('#title')).toHaveText('Hello, world!');
        await expect(page.getByRole('button', { name: 'Click' })).toBeVisible();
    });

    test('ボタンをクリックするとアラートが表示される', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Click' })).toBeEnabled();
        await page.getByRole('button', { name: 'Click' }).click();
        await page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Button clicked!');
            await dialog.dismiss();
        });
    });
});