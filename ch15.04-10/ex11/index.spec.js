import { test, expect } from '@playwright/test';

test.describe('Simple ToDo E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/ch15.04-10/ex11/index.html');
    });

    test('初期表示', async ({ page }) => {
        await expect(page).toHaveTitle(/Simple ToDo/i);
        await expect(page.locator('#new-todo')).toBeVisible();
        // リンクの確認
        const links = page.locator('footer a');
        await expect(links.nth(0)).toHaveText('All');
        await expect(links.nth(1)).toHaveText('Active');
        await expect(links.nth(2)).toHaveText('Completed');
        // 初期は空のリスト
        await expect(page.locator('#todo-list li')).toHaveCount(0);
    });

    async function addTodo(page, text) {
        await page.fill('#new-todo', text);
        await page.click('#new-todo-form button');
    }

    test('追加・完了切替・削除', async ({ page }) => {
        await addTodo(page, 'メールチェック');
        await addTodo(page, 'チャットの確認');

        const items = page.locator('#todo-list li');
        await expect(items).toHaveCount(2);

        // 1件目を完了にする
        await items.nth(0).locator('input.toggle').check();
        await expect(items.nth(0)).toHaveClass(/completed/);

        // 1件目を削除
        await items.nth(0).locator('button.destroy').click();
        await expect(items).toHaveCount(1);
        await expect(items.nth(0).locator('label.content')).toHaveText('チャットの確認');
    });

    test('フィルタ: Active/Completed/All', async ({ page }) => {
        // 3件追加し、3件目だけ完了にする
        await addTodo(page, 'AA');
        await addTodo(page, 'BB');
        await addTodo(page, 'CC');
        const items = page.locator('#todo-list li');
        await items.nth(2).locator('input.toggle').check();

        // Active を選択（未完了のみ表示）
        await page.click('footer a[href="#/active"]');
        await expect(page.locator('#todo-list li')).toHaveCount(2);
        await expect(page.locator('#todo-list li.completed')).toHaveCount(0);

        // Completed を選択（完了のみ表示）
        await page.click('footer a[href="#/completed"]');
        await expect(page.locator('#todo-list li')).toHaveCount(1);
        await expect(page.locator('#todo-list li.completed')).toHaveCount(1);
        await expect(page.locator('#todo-list li.completed label.content')).toHaveText('CC');

        // All を選択（すべて表示）
        await page.click('footer a[href="#/"]');
        await expect(page.locator('#todo-list li')).toHaveCount(3);
    });
});