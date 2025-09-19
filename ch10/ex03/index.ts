const { Animal } = require('./animal.ts');
const { sum } = require('./calc.ts');

const dog = new Animal("ポチ");
dog.walk(); // => ポチが歩いています

console.log(sum(1, 2)); // => 3