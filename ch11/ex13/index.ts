export function stringifyJSON(json: any): string {
  // null の場合は null を返す
  if (json === null || json === undefined) return "null";

  // number, boolean の場合はそのまま文字列に変換して返す
  if (typeof json === "number" || typeof json === "boolean") return json.toString();

  // string の場合はエスケープしてから "" で囲んで返す
  if (typeof json === "string") {
    return `"${json
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\u0000/g, "\\u0000")
      .replace(/\u0012/g, "\\u0012")
      .replace(/\u0008/g, "\\b")
      .replace(/\f/g, "\\f")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")}"`;
  }

  // array の場合は各要素を再帰的に処理してから [] で囲んで返す
  if (Array.isArray(json)) {
    return "[" + json.map(v => stringifyJSON(v)).join(",") + "]";
  }

  // object の場合は各キーと値を再帰的に処理してから {} で囲んで返す
  if (typeof json === "object") {
    const entries = Object.entries(json).map(([k, v]) => `${stringifyJSON(k)}:${stringifyJSON(v)}`);
    return "{" + entries.join(",") + "}";
  }

  // その他の場合はエラーをスローする
  throw new Error("サポートされていない型です");
}
