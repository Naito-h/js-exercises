> Node で debugger 文を使ってデバッグする方法を調べなさい。

1. デバッグモードで起動する
    1. `node inspect .\ch05\ex11\index.js`で実行する
    
    | コマンド | 説明 |
    | --- | --- |
    | cont または c | 次のブレークポイントまで実行 |
    | next または n | 次の行までステップ実行（関数の中には入らない）|
    | step または s | 次の行までステップ実行（関数の中に入る）|
    | out | 現在の関数の外に出る|
    | repl | 対話モードに入り、変数の中身などを確認できる|
    | exit | デバッガを終了|

1. Chrome DevToolsでデバッグする
    1. `node --inspect-brk .\ch05\ex11\index.js`で実行する
    1. chrome://inspectにアクセスする
    1. Remote Targetのリンクをクリックする
