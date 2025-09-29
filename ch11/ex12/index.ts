class FileSizeError extends Error {
    #fileSize: number;
    #maxFileSize: number;
    constructor(fileSize: number, arrowedFileSize: number) {
        super(`ファイルサイズが大きすぎます ${fileSize} bytes (${arrowedFileSize} bytes 以下にしてください)`);
        this.#fileSize = fileSize;
        this.#maxFileSize = arrowedFileSize;
    }

    get name(): string {
        return "FileSizeError";
    }
}

// ファイルを読み込む関数(ファイルサイズが大きすぎる場合にエラーをスローする)
function readFile(filePath: string): string {
    const maxSize = 1024; // 1024バイト
    const fileSize = 2048; // 例として2048バイトとする

    if (fileSize > maxSize) {
        throw new FileSizeError(fileSize, maxSize);
    }

    return "ファイルの内容";
}

// ファイルを読み込むが、許容サイズをオーバーしているためエラーをスローする
try {
    const content = readFile("./file.txt");
    console.log(content);
} catch (error) {
    console.error(error);
}