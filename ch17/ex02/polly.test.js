import { Polly } from "@pollyjs/core";
import FetchAdapter from "@pollyjs/adapter-fetch";
import FSPersister from "@pollyjs/persister-fs";
import { closeIssue, createIssue, listIssues } from "./manage_git_issue.js";

Polly.register(FetchAdapter); // fetch APIをモックするためのAdapter
Polly.register(FSPersister);  // ファイルシステムに記録を保存するためのPersister

describe("Polly tests", () => {

  const polly = new Polly("github-api", {
    adapters: ["fetch"],
    persister: "fs", // 記録をファイルシステムに保存する
    persisterOptions: {
      fs: {
        recordingsDir: "./ex02/__recordings__", // 記録ファイル（HAR形式）の保存先ディレクトリ
      },
    },
    recordIfMissing: true,  // 記録がなければ実際のAPIを叩いてレスポンスをファイルに保存する
  });


  // テストが終わった後にPollyを停止して、記録を保存する
  afterEach(async () => {
    await polly.stop();
  });

  test("createIssue", async () => {
    // createIssue関数を呼び出し、結果を取得
    const result = await createIssue("Naito-h", "js-exercises", "test title", "test body");

    // createIssue関数が正しいデータを返すことを確認
    expect(result).toEqual(expect.objectContaining({
      title: "test title",
      body: "test body",
    }));
  });

  test("closeIssue", async () => {
    // クローズするためのIssueを作成する
    const created = await createIssue("Naito-h", "js-exercises", "test title", "test body");
    
    // createIssue関数を呼び出し、作成したIssueをクローズする
    const result = await closeIssue("Naito-h", "js-exercises", created.number);

    // closeIssue関数が正しいデータを返すことを確認
    expect(result).toEqual(expect.objectContaining({
      title: "test title",
      body: "test body",
      number: created.number,
    }));
  });

  test("listIssues", async () => {
    // リストで表示するためのIssueを作成する
    await createIssue("Naito-h", "js-exercises", "test1 title", "test1 body");
    await createIssue("Naito-h", "js-exercises", "test2 title", "test2 body");
    await createIssue("Naito-h", "js-exercises", "test3 title", "test3 body");

    // listIssues関数を呼び出し、結果を取得
    const issues = await listIssues("Naito-h", "js-exercises");

    // listIssuesの結果に作成したIssueが含まれていること
    expect(issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: "test1 title" }),
      expect.objectContaining({ title: "test2 title" }),
      expect.objectContaining({ title: "test3 title" }),
    ]));
  });
});
