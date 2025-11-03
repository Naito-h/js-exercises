function counterIter(max: number) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value: any) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e: any) {
      console.log("counterIter: throw:", e);
      // throw e;
      return { value: undefined, done: true }; // エラーにならないように
    },
  };
}

function* counterGen(max: number) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}

// ここから回答
// 明示的にイテレータプロトコルの next() を呼び出す
console.log("--- counterIter ---");
const iterIter = counterIter(3);
console.log(iterIter.next());
console.log(iterIter.next());
console.log(iterIter.next());
console.log(iterIter.next());

console.log("--- counterGen ---");
const iterGen = counterGen(3);
console.log(iterGen.next());
console.log(iterGen.next());
console.log(iterGen.next());
console.log(iterGen.next());

// 明示的にイテレータプロトコルの return() を呼び出す
console.log("--- counterIter with return ---");
const iterIter2 = counterIter(3);
console.log(iterIter2.next());
console.log(iterIter2.return("return value from iterIter2"));

console.log("--- counterGen with return ---");
const iterGen2 = counterGen(3);
console.log(iterGen2.next());
console.log(iterGen2.return());

// 明示的にイテレータプロトコルの throw() を呼び出す
console.log("--- counterIter with throw ---");
const iterIter3 = counterIter(3);
console.log(iterIter3.next());
try {
  console.log(iterIter3.throw(new Error("error from iterIter3")));
} catch (e) {
  console.log("caught:", e);
}
console.log(iterIter3.next());

console.log("--- counterGen with throw ---");
const iterGen3 = counterGen(3);
console.log(iterGen3.next());
try {
  console.log(iterGen3.throw(new Error("error from iterGen3")));
} catch (e) {
  console.log("caught:", e);
}
console.log(iterGen3.next());

// for...of 文でイテレーションを行う
console.log("--- for...of with counterIter ---");
for (let n of counterIter(3)) {
  console.log(n);
}

console.log("--- for...of with counterGen ---");
for (let result of counterGen(3)) {
  console.log(result);
}

// for...of 文を途中で break する
console.log("--- for...of with counterIter and break ---");
for (let n of counterIter(3)) {
  if (n === 2) break;
  console.log(n);
}

console.log("--- for...of with counterGen and break ---");
for (let n of counterGen(3)) {
  if (n === 2) break;
  console.log(n);
}

// for...of 文を途中で throw する
console.log("--- for...of with counterIter and throw ---");
try {
  for (let n of counterIter(3)) {
    if (n === 2) throw new Error("error from counterIter");
    console.log(n);
  }
} catch (e) {
  console.log("caught:", e);
}

console.log("--- for...of with counterGen and throw ---");
try {
  for (let n of counterGen(3)) {
    if (n === 2) throw new Error("error from counterGen");
    console.log(n);
  }
} catch (e) {
  console.log("caught:", e);
}