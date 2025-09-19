## Nodeのモジュールの場合
エクスポートするときの名前が変わる
```
変更前：module.exports = { Animal };
変更後：module.exports = { Animal: Animal2 };
```

## ES6のモジュールの場合

### デフォルトエクスポート
インポートしたクラス、関数の名前が変わる
```
変更前：import Animal from "./animal.ts";
変更後：import Animal2 from "./animal.ts";
```

### 名前変更を伴うインポート
インポートしたクラス、関数の名前が変わる<br>
名前変更した名前は変わらない
```
変更前：import { Dog as Wan } from "./animal.ts";
変更後：import { Dog2 as Wan } from "./animal.ts";
```

### 再エクスポート
再エクスポートする際に、名前変更を伴うインポートに変化する<br>
再エクスポート先の名前は変わらない
```
変更前：export { Cat } from "./animal.ts";
変更後：export { Cat2 as Cat } from "./animal.ts";
```