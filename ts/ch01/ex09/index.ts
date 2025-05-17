class DefaultMap extends Map {
  defaultValue: number;
  constructor(defaultValue: number) {
    super();
    this.defaultValue = defaultValue;
  }

  get(key: string) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      return this.defaultValue;
    }
  }
}

// 単語の出現頻度を計算するクラス
class WordHistogram {
  wordCounts: DefaultMap;
  totalWords: number;
  constructor() {
    this.wordCounts = new DefaultMap(0);
    this.totalWords = 0;
  }

  // 単語を追加するメソッド
  add(text: string) {
    // 正規表現で単語を抽出
    const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
    // マッチした単語を配列に変換
    const words = [...matches].map((r) => r[0]);

    // 単語をカウント
    for (let word of words) {
      let count = this.wordCounts.get(word);
      this.wordCounts.set(word, count + 1);
      this.totalWords++;
    }
  }

  toString() {
    let entries = [...this.wordCounts];

    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1];
      }
    });

    // 100%に対する割合を計算
    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalWords) * 100;
    }

    // 出現頻度 0.5% 以上を取得
    entries = entries.filter((entry) => entry[1] >= 0.5);
    // padStart で表示幅を揃える / # の数を n ではなく 10 * n に変更
    const lines = entries.map(
      ([l, n]) =>
        `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`,
    );

    return lines.join("\n");
  }
}

async function histogramFromStdin() {
  process.stdin.setEncoding("utf-8");
  let histogram = new WordHistogram();
  for await (let chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram;
}

histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});
