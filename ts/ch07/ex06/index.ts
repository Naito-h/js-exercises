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

// mathの点数が高い順にソート
export const sortByMath = (arr: any[]): any[] => {
    const newArr = [...arr];
    newArr.sort((a, b) => b.geography - a.geography).sort((a, b) => b.chemistry - a.chemistry).sort((a, b) => b.math - a.math);
    return newArr;
};

console.log(sortByMath(data));

// [
//   { name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80 },
//   { name: 'Justin', class: 'C', math: 80, chemistry: 40, geography: 30 },
//   { name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30 },
//   { name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50 },
//   { name: 'Mallet', class: 'C', math: 60, chemistry: 70, geography: 90 },
//   { name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40 },
//   { name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60 },
//   { name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60 },
//   { name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20 }
// ]