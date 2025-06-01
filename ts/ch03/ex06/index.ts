export function slice(str: string, indexStart: number | undefined, indexEnd: number | undefined): string {
  // TODO: ここを実装しなさい
  let res = "";

  // indexStartとindexEndを整数に変換
  if (indexStart === undefined) {
    indexStart = 0;
  } else {
    indexStart = Math.floor(indexStart);
  }
  if (indexEnd === undefined) {
    indexEnd = str.length;
  } else {
    indexEnd = Math.floor(indexEnd);
  }

  // indexStartを調整
  if (isNaN(indexStart)) {
    indexStart = 0;
  } else if (indexStart >= str.length) {
    return "";
  } else if (indexStart < 0) {
    indexStart = indexStart + str.length > 0 ? indexStart + str.length : 0;
  }

  // indexEndを調整
  if (isNaN(indexEnd)) {
    return "";
  } else if (indexEnd > str.length) {
    indexEnd = str.length;
  } else if (indexEnd < 0) {
    indexEnd = indexEnd + str.length > 0 ? indexEnd + str.length : 0;
  }

  if (indexEnd <= indexStart) {
    return "";
  }

  // 文字列をスライス
  for (let i = indexStart; i < indexEnd; i++) {
    res += str[i];
  }

  return res;
}
