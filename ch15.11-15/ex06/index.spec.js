import { expect, test } from "@playwright/test";

// ToDoを追加
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

// Todoを完了にする
async function checkToDo(page, index) {
  await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

// Todoを削除する
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}

// ToDoの数を数える
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

// 指定したインデックスのToDo要素を取得する
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe("ToDo管理アプリ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex06/");
  });

  test("初期表示", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("新しいToDoを追加する", async ({ page }) => {
    await addToDo(page, "タスク１");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("タスク１");
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("Todoを完了する", async ({ page }) => {
    await addToDo(page, "タスク１");
    await addToDo(page, "タスク２");
    await checkToDo(page, 0);

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("タスク１");
    await expect(label1).toHaveCSS("text-decoration-line", "line-through");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("タスク２");
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("Todoを削除する", async ({ page }) => {
    await addToDo(page, "タスク１");
    await addToDo(page, "タスク２");
    await deleteToDo(page, 0);

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("タスク２");
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("Windowを更新する", async ({ page }) => {
    await addToDo(page, "タスク１");
    await addToDo(page, "タスク２");
    await addToDo(page, "タスク３");
    await checkToDo(page, 1);
    await deleteToDo(page, 2);
    await page.reload();

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("タスク１");
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("タスク２");
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });
});
