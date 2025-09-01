```
InstrumentedLinkedList
    √ #push (2 ms)
    × #pushAll (2 ms)

InstrumentedLinkedList › #pushAll                                                                                                                                                                   
    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 4
```

1. `pushAll`の`super.pushAll`で親クラスの`pushAll`が呼ばれる
1. `super.pushAll`の中で`this.push`が呼ばれる
1. `this.push`では子クラスの`push`を呼び出す
1. 子クラスの`push`で`#pushCount++`が実行される
1. `pushAll`の最後で、`this.#pushCount += items.length`が実行される

pushAllとその中で呼び出されるpushで2重でカウントしているので、テストが通らなかった