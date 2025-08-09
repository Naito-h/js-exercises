const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点
const sumOfMath = data.reduce((sum, student) => sum + student.math, 0);
console.log(`mathの合計点: ${sumOfMath}`); // Output: mathの合計点: 530

// クラスAのchemistryの平均点
const dataOfClassA = data.filter(student => student.class === "A");
const averageOfChemistry = dataOfClassA.reduce((sum, student) => sum + student.chemistry, 0) / dataOfClassA.length;
console.log(`クラスAのchemistryの平均点: ${averageOfChemistry}`); // Output: クラスAのchemistryの平均点: 45

// 3科目合計点のクラスC内での平均点
const dataOfClassC = data.filter(student => student.class === "C");
const averageOfClassC = dataOfClassC.reduce((sum, student) => sum + student.math + student.chemistry + student.geography, 0) / (dataOfClassC.length);
console.log(`クラスCの3科目合計点の平均: ${averageOfClassC}`); // Output: クラスCの3科目合計点の平均: 176.66666666666666

// 3科目合計点が最も高い人のname
const nameOfTopScorer = data.reduce((top, student) => {
    const totalScore = student.math + student.chemistry + student.geography;
    return totalScore > top.score ? { name: student.name, score: totalScore } : top;
}, { name: "", score: 0 }).name;
console.log(`3科目合計点が最も高い人: ${nameOfTopScorer}`); // Output: 3科目合計点が最も高い人: Frank

// 全体のgeographyの標準偏差
const geographyScores = data.map(student => student.geography);
const meanGeography = geographyScores.reduce((sum, score) => sum + score, 0) / geographyScores.length;
const variance = geographyScores.reduce((sum, score) => sum + Math.pow(score - meanGeography, 2), 0) / geographyScores.length;
const stdDevGeography = Math.sqrt(variance);
console.log(`geographyの標準偏差: ${stdDevGeography}`); // Output: geographyの標準偏差: 22.3330569358242
