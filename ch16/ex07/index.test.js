import { checkEntry } from "./index.js";

describe("checkEntry tests", () => {
  test("ファイルのパスを指定", async () => {
    const result = await checkEntry("./ch16/ex07/directory/file.txt");
    expect(result).toBe("file");
  });

  test("フォルダのパスを指定", async () => {
    const result = await checkEntry("./ch16/ex07/directory");
    expect(result).toBe("directory");
  });

  test("存在しないパスを指定", async () => {
    await expect(checkEntry("nonexistent.txt")).rejects.toThrow();
  });
});