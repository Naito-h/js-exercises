import { stat } from 'fs/promises';

// コマンドライン引数からファイルのパスを取得する
const path = process.argv[2];

export async function checkEntry(path) {
  // ファイルの情報を取得する
  let stats;
  try {
    stats = await stat(path);
  } catch (err) {
    console.error("statsの取得に失敗しました");
    throw err;
  }

  // 指定したパスがどのタイプに該当するかをチェックする
  // Windows環境では file と directory 以外のタイプは存在しないが、
  // Unix系環境では様々なタイプが存在するため、すべてのタイプをチェックする
  if (stats.isFile()) {
    return "file";
  } else if (stats.isDirectory()) {
    return "directory";
  } else if (stats.isSymbolicLink()) {
    return "symbolic link"; 
  } else if (stats.isBlockDevice()) {
    return "block device";
  } else if (stats.isCharacterDevice()) {
    return "character device";
  } else if (stats.isFIFO()) {
    return "FIFO";
  } else if (stats.isSocket()) {
    return "socket";
  } else {
    return "other";
  }
}

// checkEntry(path)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });