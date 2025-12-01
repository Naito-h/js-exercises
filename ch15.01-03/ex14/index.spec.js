import { test, expect } from '@playwright/test';

test.describe('Product List E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/ch15.01-03/ex14/index.html');
    });

    test('初期表示のテスト', async ({ page }) => {
        await expect(page).toHaveTitle(/Product List/i);
        await expect(page.getByTestId('select')).toBeVisible();
        await expect(page.locator('#productList')).toBeVisible();
        await expect(page.getByTestId('food1')).toHaveText('お菓子 - ¥1000');
        await expect(page.getByTestId('stationery1')).toHaveText('消しゴム - ¥200');
        await expect(page.getByTestId('stationery2')).toHaveText('ものさし - ¥300');
    });

    test('食品でフィルタ', async ({ page }) => {
        await page.getByTestId('select').selectOption('food');
        await expect(page.getByTestId('food1')).toBeVisible();
        await expect(page.getByTestId('stationery1')).toBeHidden();
        await expect(page.getByTestId('stationery2')).toBeHidden();
    });

    test('文房具でフィルタ', async ({ page }) => {
        await page.getByTestId('select').selectOption('stationery');
        await expect(page.getByTestId('food1')).toBeHidden();
        await expect(page.getByTestId('stationery1')).toBeVisible();
        await expect(page.getByTestId('stationery2')).toBeVisible();
    });

    test('フィルタ後にすべてを選択', async ({ page }) => {
        await page.getByTestId('select').selectOption('food');
        await page.getByTestId('select').selectOption('all');
        await expect(page.getByTestId('food1')).toBeVisible();
        await expect(page.getByTestId('stationery1')).toBeVisible();
        await expect(page.getByTestId('stationery2')).toBeVisible();
    });
});