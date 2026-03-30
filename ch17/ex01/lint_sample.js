let a, x, y;
const r = 10;

// 修正前
// with (Math) {
//   a = PI * r * r;
//   x = r * cos(PI);
//   y = r * sin(PI / 2);
// }

// 修正後 import文を使用して必要な関数と定数をインポートする
import { PI, cos, sin } from 'math';

a = PI * r * r;
x = r * cos(PI);
y = r * sin(PI / 2);

console.log(a, x, y);
