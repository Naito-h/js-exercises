try {
    console.log("これはtryブロックです");
    throw new Error("エラーを投げます");
} catch (e) {
    console.error("エラーが発生しました:", e);
} finally {
    console.log("これはfinallyブロックです");
}