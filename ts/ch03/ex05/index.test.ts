import { lfToCrLf, crLfToLf } from "./index.ts"; // typescript で書く場合は "./index.ts"

const str = "The quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog.\r\nThe quick brown fox jumps over the lazy dog.";

describe("LFとCRLFの変換", () => {
  it("LFをCRLFに変換すること", () => {
    const expected = "The quick brown fox jumps over the lazy dog.\r\nThe quick brown fox jumps over the lazy dog.\r\nThe quick brown fox jumps over the lazy dog.";
    const actual = lfToCrLf(str);
    expect(actual).toBe(expected);
  });

  it("CRLFをLFに変換すること", () => {
    const expected = "The quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog.";
    const actual = crLfToLf(str);
    expect(actual).toBe(expected);
  });
});