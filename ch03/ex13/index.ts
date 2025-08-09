export function eq(a: any, b: any) {
  // 完全一致なら true
  if (a === b) {
    return true;
  }
  // null と undefined なら true
  if (a === null && b === undefined || a === undefined && b === null) {
    return true;
  }
  // 文字列と数値の比較
  if (typeof a === "string" && typeof b === "number") {
    return a === b.toString();
  }
  if (typeof a === "number" && typeof b === "string") {
    return a.toString() === b;
  }
  // booleanと数値、文字列の比較
  if (typeof a === "boolean" && typeof b === "number" || typeof a === "boolean" && typeof b === "string") {
    return a === Boolean(b);
  }
  if (typeof a === "number" && typeof b === "boolean" || typeof a === "string" && typeof b === "boolean") {
    return Boolean(a) === b;
  }
  // オブジェクトと数値の比較
  if (typeof a === "object" && typeof b === "number" && a !== null && a instanceof Date === false) {
    return a.valueOf() === b || a.toString() === b.toString();
  }
  if (typeof a === "number" && typeof b === "object" && b !== null && b instanceof Date === false) {
    return a === b.valueOf() || a.toString() === b.toString();
  }
  // オブジェクトと文字列の比較
  if (typeof a === "object" && typeof b === "string" && a !== null) {
    return a.toString() === b || a.valueOf() === Number(b);
  }
  if (typeof a === "string" && typeof b === "object" && b !== null) {
    return a === b.toString() || Number(a) === b.valueOf();
  }
  // 関数と数値、文字列の比較
  if (typeof a === "function" && typeof b !== "function") {
    const res = a;
    return res.valueOf() === Number(b) || res.toString() === b.toString();
  }
  if (typeof a !== "function" && typeof b === "function") {
    const res = b;
    return res.valueOf() === Number(a) || res.toString() === a.toString();
  }
  return false;
}

export function lte(a: any, b: any): boolean {
  // 完全一致またはaがb以下なら true
  if (a === b || a < b) {
    return true;
  }
  // null と undefined なら true
  if (a === null && b === undefined || a === undefined && b === null) {
    return true;
  }
  // 片方がundefinedなら false
  if (a === undefined && b !== undefined || a !== undefined && b === undefined) {
    return false;
  }
  // aがnullでbがnull以外なら true
  if (a === null && b !== null && b !== undefined) {
    return true;
  }
  // booleanと数値、文字列の比較
  if (typeof a === "boolean" && typeof b === "number" || typeof a === "boolean" && typeof b === "string") {
    return a === Boolean(b);
  }
  if (typeof a === "number" && typeof b === "boolean" || typeof a === "string" && typeof b === "boolean") {
    return Boolean(a) === b;
  }
  // オブジェクトと数値、文字列の比較
  if (typeof a === "object" && typeof b !== "object" && a !== null && a instanceof Date === false) {
    if (a.valueOf() === undefined) return false;
    if (a.valueOf() === null) return a.valueOf() < b;
    return a.valueOf() === b || a.valueOf() < b || a.toString() === b.toString();
  }
  if (typeof a !== "object" && typeof b === "object" && b !== null && b instanceof Date === false) {
    if (b.valueOf() === undefined) return false;
    if (b.valueOf() === null) return a < b.valueOf();
    return a === b.valueOf() || a < b.valueOf() || a.toString() === b.toString();
  }
  // 関数と数値、文字列の比較
  if (typeof a === "function" && typeof b !== "function") {
    const res = a;
    if (res.valueOf() === undefined) return false;
    if (res.valueOf() === null) return res.toString() < b.toString();
    return res.valueOf() === Number(b) || res.toString() === b.toString();
  }
  if (typeof a !== "function" && typeof b === "function") {
    const res = b;
    if (res.valueOf() === undefined) return false;
    if (res.valueOf() === null) return a < res.toString();
    return res.valueOf() === Number(a) || res.toString() === a.toString();
  }
  return false;
}
