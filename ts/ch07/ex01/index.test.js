import { addMatrix, mulMatrix } from "./index.ts";

test.each([
  [ [[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[9, 8, 7], [6, 5, 4], [3, 2, 1]], [[10, 10, 10], [10, 10, 10], [10, 10, 10]] ],
  [ [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[9, 9, 9], [9, 9, 9], [9, 9, 9]], [[10, 10, 10], [10, 10, 10], [10, 10, 10]] ],
  [ [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]] ],
])("addMatrix with %j and %j", (matrix1, matrix2, expected) => {
  const addedMatrix = addMatrix(matrix1, matrix2);
  expect(addedMatrix).toEqual(expected);
});

test.each([
  [ [[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[9, 8, 7], [6, 5, 4], [3, 2, 1]],[[30, 24, 18], [84, 69, 54], [138, 114, 90]] ],
  [ [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[9, 9, 9], [9, 9, 9], [9, 9, 9]], [[27, 27, 27], [27, 27, 27], [27, 27, 27]] ],
  [ [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]] ],
])("mulMatrix with %j and %j", (matrix1, matrix2, expected) => {
  const multipliedMatrix = mulMatrix(matrix1, matrix2);
  expect(multipliedMatrix).toEqual(expected);
});