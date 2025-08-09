// バブルソート
export const bubbleSort = (array: any[], compare = (lhs: any, rhs: any) => (lhs < rhs ? -1 : lhs > rhs ? 1 : 0)): any[] => {
    // 配列の長さ-1回のループする
    for (let i = 1; i < array.length; i++) {
        // 隣接する要素を比較して、左側が大きい場合は交換する
        for (let j = 0; j < array.length - i; j++) {
            if (compare(array[j], array[j + 1]) > 0) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
};

console.log(bubbleSort([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]
console.log(bubbleSort(["c", "a", "b"])); // ["a", "b", "c"]