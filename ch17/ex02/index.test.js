import { afterEach, describe, expect, jest } from "@jest/globals";
import { closeIssue, createIssue, listIssues } from "./manage_git_issue.js";

// fetch関数をモックする
fetch = jest.fn();

describe("manage_git_issue tests", () => {

	afterEach(() => {
    // fetchのモックをクリアして、次のテストに影響を与えないようにする
		fetch.mockClear();
	});

	test("createIssue", async () => {
    // fetchのモックを設定
		fetch.mockResolvedValue({
			ok: true,
			json: async () => ({ id: 1, number: 10, title: "test title", body: "test body" }),
		});

    // createIssue関数を呼び出し、結果を取得
		const result = await createIssue("Naito-h", "js-exercises", "test title", "test body");

    // fetchが正しいURLとオプションで呼び出されたことを確認
		expect(fetch).toHaveBeenCalledWith(
			"https://api.github.com/repos/Naito-h/js-exercises/issues",
			expect.objectContaining({ method: "POST" }),
		);

    // createIssue関数が正しいデータを返すことを確認
    expect(result).toEqual({ id: 1, number: 10, title: "test title", body: "test body" });
	});

	test("closeIssue", async () => {
    // fetchのモックを設定
		fetch.mockResolvedValue({
			ok: true,
			json: async () => ({ id: 1, number: 10, title: "test title", body: "test body" }),
		});

    // closeIssue関数を呼び出し、結果を取得
		const result = await closeIssue("Naito-h", "js-exercises", 10);

    // fetchが正しいURLとオプションで呼び出されたことを確認
		expect(fetch).toHaveBeenCalledWith(
			"https://api.github.com/repos/Naito-h/js-exercises/issues/10",
			expect.objectContaining({ method: "PATCH" }),
		);

    // closeIssue関数が正しいデータを返すことを確認
		expect(result).toEqual({ id: 1, number: 10, title: "test title", body: "test body" });
	});

	test("listIssues", async () => {
    // fetchのモックを設定
		fetch.mockResolvedValue({
			ok: true,
			json: async () => [
        { id: 1, number: 10, title: "test1", body: "test1 body" },
        { id: 2, number: 11, title: "test2", body: "test2 body" },
        { id: 3, number: 12, title: "test3", body: "test3 body" },
      ],
		});

    // listIssues関数を呼び出し、結果を取得
		const result = await listIssues("Naito-h", "js-exercises");

    // fetchが正しいURLとオプションで呼び出されたことを確認
		expect(fetch).toHaveBeenCalledWith(
			"https://api.github.com/repos/Naito-h/js-exercises/issues",
			expect.objectContaining({ method: "GET" }),
		);
    
    // listIssues関数が正しいデータを返すことを確認
		expect(result).toEqual([
      { id: 1, number: 10, title: "test1" },
      { id: 2, number: 11, title: "test2" },
      { id: 3, number: 12, title: "test3" },
    ]);
	});
});
