## 問題 10.2
CommonJS と ES Module 以外の JavaScript のモジュール方式名を調べて記述しなさい

- AMD(Asynchronous Module Definition)
  - ブラウザ向け
  - 非同期でモジュールを読み込むための仕組み
  - モジュールの依存関係を明示的に定義する
  - 非同期で読み込むため、パフォーマンスが高い

- UMD(Universal Module Definition)
  - ライブラリの配布向け
  - AMD、CommonJS、グローバル変数のいずれにも対応
  - モジュールをどんな環境でも使えるように設計されているため、汎用性が高い。
