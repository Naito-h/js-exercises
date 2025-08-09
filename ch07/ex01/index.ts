export const addMatrix = (m1: number[][], m2: number[][]): number[][] => {
    const result: number[][] = [];
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m1[i].length; j++) {
            if (!result[i]) {
                result[i] = [];
            }
            result[i][j] = m1[i][j] + m2[i][j];
        }
    }
    return result;
}

export const mulMatrix = (m1: number[][], m2: number[][]): number[][] => {
    const result: number[][] = [];
    for ( let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m2[0].length; j++) {
            if (!result[i]) {
                result[i] = [];
            }
            result[i][j] = 0;
            for (let k = 0; k < m1[0].length; k++) {
                result[i][j] += m1[i][k] * m2[k][j];
            }
        }
    }
    return result;
}

const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const matrix2 = [
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1]
];

const addedMatrix = addMatrix(matrix1, matrix2);
const multipliedMatrix = mulMatrix(matrix1, matrix2);
console.log(`Matrix 1: ${JSON.stringify(matrix1)}`); // [[1,2,3],[4,5,6],[7,8,9]]
console.log(`Matrix 2: ${JSON.stringify(matrix2)}`); // [[9,8,7],[6,5,4],[3,2,1]]
console.log(`Added Matrix: ${JSON.stringify(addedMatrix)}`); // [[10,10,10],[10,10,10],[10,10,10]]
console.log(`Multiplied Matrix: ${JSON.stringify(multipliedMatrix)}`); // [[30,24,18],[84,69,54],[138,114,90]]