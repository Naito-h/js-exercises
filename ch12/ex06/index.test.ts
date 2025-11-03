import { walk } from "./index.ts";

describe("walk", () => {
    test("指定したディレクトリ内の全てのファイルとサブディレクトリを列挙する", async () => {
        const dirPath = './ch12/ex06';
        const expected = [
            {'path': './ch12/ex06/dir', 'isDirectory': true},
            {'path': './ch12/ex06/dir/file.txt', 'isDirectory': false},
            {'path': './ch12/ex06/index.test.ts', 'isDirectory': false},
            {'path': './ch12/ex06/index.ts', 'isDirectory': false}
        ];
        const result = [...walk(dirPath)];
        expect(result).toEqual(expected);
    });
});
