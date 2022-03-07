const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R, C, T;
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let botPos;
let input = [];

function spread() {
  const temp = Array.from({ length: R }, () => Array(C).fill(0));

  for (let y = 0; y < R; y++) {
    if (!botPos) if (input[y][0] === -1) botPos = y;
    for (let x = 0; x < C; x++) {
      const now = input[y][x];
      const spreadAmount = Math.floor(now / 5);
      let cnt = 0;
      if (now > 0) {
        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (nx >= 0 && ny >= 0 && nx < C && ny < R && input[ny][nx] !== -1) {
            temp[ny][nx] += spreadAmount;
            cnt += 1;
          }
        }
        input[y][x] -= spreadAmount * cnt;
      }
    }
  }

  input = input.map((row, rowIndex) =>
    row.map((x, colIndex) => x + temp[rowIndex][colIndex])
  );
}

function turn() {
  let temp = 0;
  // up
  input[botPos].unshift(0);
  let bottomTemp = input[botPos].pop();
  input[botPos][1] = 0;

  input[0].push(0);
  let topTemp = input[0].shift();
  for (let i = botPos - 1; i >= 0; i--) {
    temp = input[i][C - 1];
    input[i][C - 1] = bottomTemp;
    bottomTemp = temp;
  }

  for (let i = 1; i < botPos; i++) {
    temp = input[i][0];
    input[i][0] = topTemp;
    topTemp = temp;
  }
  input[botPos][0] = -1;
  // down
  bottomTemp = input[R - 1].shift();
  input[R - 1].push(0);

  topTemp = input[botPos + 1].pop();
  input[botPos + 1].unshift(0);
  input[botPos + 1][1] = 0;

  for (let i = R - 2; i > botPos + 1; i--) {
    temp = input[i][0];
    input[i][0] = bottomTemp;
    bottomTemp = temp;
  }

  for (let i = botPos + 2; i < R; i++) {
    temp = input[i][C - 1];
    input[i][C - 1] = topTemp;
    topTemp = temp;
  }
  input[botPos + 1][0] = -1;
}

function solution() {
  while (T--) {
    spread();
    turn();
  }
}

rl.on("line", function (line) {
  if (!R) [R, C, T] = line.split(" ").map((n) => +n);
  else {
    input.push(line.split(" ").map((n) => +n));

    if (input.length === R) {
      solution();
      let sum = 0;
      for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
          if (input[i][j] !== -1) sum += input[i][j];
        }
      }

      console.log(sum);
      rl.close();
    }
  }
});

// [
//   [0, 0, 0, 0, 0, 2, 7, 6],
//   [0, 0, 1, 0, 3, 1, 3, 5],
//   [-1, 0, 3, 1, 1, 0, 6, 6],
//   [-1, 1, 1, 3, 1, 2, 6, 7],
//   [0, 1, 3, 1, 3, 6, 9, 5],
//   [1, 5, 6, 5, 5, 6, 8, 7],
//   [9, 10, 9, 4, 5, 6, 7, 1],
// ];
