// デフォルトエクスポート
import Animal2, { Dog2 as Wan } from "./animal.ts";

// 名前付きエクスポート
import sum, { square as pow } from "./calc.ts";

// 再エクスポート
import { Cat, subtract } from "./reexport.ts";

const mouse = new Animal2("チュー");
mouse.walk(); // => チューが歩いています
const dog = new Wan("ポチ");
dog.walk(); // => ポチが歩いています
dog.bark(); // => ポチが吠えています
const cat = new Cat("ミケ");
cat.walk(); // => ミケが歩いています
cat.meow(); // => ミケが鳴いています

console.log(sum(1, 2)); // => 3
console.log(pow(3)); // => 9
console.log(subtract(5, 2)); // => 3