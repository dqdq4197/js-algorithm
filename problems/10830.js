/**
 * 백준 - 행렬 / 분할정복
 * https://www.acmicpc.net/problem/10830
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, B;
let matrix = [];

rl.on("line", function (line) {
  if (!N) {
    [N, B] = line.split(" ").map(Number);
  } else {
    matrix.push(line.split(" ").map((n) => +n % 1000));

    if (matrix.length === N) {
      const result = calc(matrix, B);
      console.log(result.map((row) => row.join(" ")).join("\n"));

      rl.close();
    }
  }
});

function multiplyMatrix(matrix1, matrix2) {
  const result = Array.from({ length: N }, () => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        result[i][j] += (matrix1[i][k] * matrix2[k][j]) % 1000;
      }

      result[i][j] %= 1000;
    }
  }

  return result;
}

function calc(matrix, exp) {
  if (exp === 1) return matrix;

  const half = calc(matrix, Math.floor(exp / 2));
  const halfSquare = multiplyMatrix(half, half);

  if (exp % 2 === 0) return halfSquare;
  return multiplyMatrix(halfSquare, matrix);
}
