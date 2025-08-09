function makeFixedSizeArray(size: number) {
  const array = new Array(size);
  return {
    get(index: number) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index: number, value: any) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ
  private len: number;
  private array: ReturnType<typeof makeFixedSizeArray>;

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index: number) {
    return this.array.get(index);
  }
  set(index: number, value: any) {
    this.array.set(index, value);
    this.len += 1;
  }
  length() {
    return this.len;
  }
  push(value: any) {
    // this.array に空が無い場合は「再配置」を行う
    if (this.len >= this.array.length()) {
        // 新しい固定長配列を作成
        const old = this.array;
        this.array = makeFixedSizeArray(old.length() * 2);
        // 古い配列 (old) の要素を新しい配列にコピー
        for (let i = 0; i < old.length(); i++) {
        this.array.set(i, old.get(i));
        }
    }
    this.set(this.len, value);
  }
}

const dynamicArray = new DynamicSizeArray();
console.log(dynamicArray.length()); // 0
dynamicArray.set(0, 1);
console.log(dynamicArray.get(0)); // 1
dynamicArray.push(2);
console.log(dynamicArray.get(1)); // 2
console.log(dynamicArray.length()); // 2
dynamicArray.set(2, 3);
console.log(dynamicArray.get(2)); // 3
dynamicArray.push(4);
console.log(dynamicArray.get(3)); // 4
dynamicArray.push(5);
console.log(dynamicArray.get(4)); // 5
dynamicArray.push(6);
console.log(dynamicArray.get(5)); // 6
dynamicArray.push(7);
console.log(dynamicArray.get(6)); // 7
dynamicArray.set(7, 8);
console.log(dynamicArray.get(7)); // 8
dynamicArray.push(9);
console.log(dynamicArray.get(8)); // 9