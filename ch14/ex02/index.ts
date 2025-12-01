export class MyArrayLike<T = any> {
  length: number;

  constructor(items: T[] | number = []) {
    if (typeof items === "number") {
      this.length = items;
    } else {
      this.length = items.length;
      for (let i = 0; i < items.length; i++) {
        (this as any)[i] = items[i];
      }
    }
  }
}

export class MyArray<T = any> extends Array<T> {
  constructor(items: T[] = []) {
    super(...items);
  }

  // MyArrayLike を返すようにする
  static get [Symbol.species]() {
    return MyArrayLike as any;
  }
}

// 動作サンプル
const array = new MyArray<number>([1, 2, 3, 4, 5]);
const mapped = array.map(x => x * x); // MyArrayLike<number>
const sliced = array.slice(1, 3);     // MyArrayLike<number>
const newArray = Array.from(mapped); // [1, 4, 9, 16, 25]

console.log('original MyArray:', array instanceof MyArray, array);
console.log('mapped MyArrayLike:', mapped instanceof MyArrayLike, mapped);
console.log('sliced MyArrayLike:', sliced instanceof MyArrayLike, sliced);
console.log('converted to Array:', newArray);