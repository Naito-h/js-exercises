export function newHashTable(capacity: number) {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity), // マッピングを格納する固定長の配列
    get(key: any) {
      // keyにマップされた値を取得する
        return this.entries[key] || undefined;
    },
    put(key: any, value: any) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
      if (this.entries[key] === undefined) {
        this.size += 1; // 新しいマッピングが追加された場合、サイズを増やす
      }
      this.entries[key] = value; // keyにvalueをマッピングする
    },
    remove(key: any) {
      // keyのマッピングを削除する
      if (this.entries[key] !== undefined) {
        this.size -= 1; // マッピングが削除された場合、サイズを減らす
      }
      this.entries[key] = undefined; // keyのマッピングを削除する
    },
  };
}

function sample() {
  const hashTable = newHashTable(10);
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}

sample();