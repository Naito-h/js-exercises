import {newHashTable} from "./index.ts";

const hashTable = newHashTable(10);

test("newHashTable", () => {
    expect(hashTable.size).toBe(0);
    expect(hashTable.put("key1", "value1")).toBeUndefined();
    expect(hashTable.put("key2", { value: "value2" })).toBeUndefined();
    expect(hashTable.entries.length).toBe(10);
    expect(hashTable.get("key1")).toBe("value1");
    expect(hashTable.get("key2")).toEqual({ value: "value2" });
    expect(hashTable.get("key3")).toBeUndefined();
});

test.each([
    ["key1", "value1"],
    ["key2", { value: "value2" }],
    ["key3", undefined],
])("get(%s)", (key, expected) => {
    expect(hashTable.get(key)).toEqual(expected);
});