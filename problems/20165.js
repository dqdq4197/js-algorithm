/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/20165
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirs = {
  E: [0, 1],
  W: [0, -1],
  S: [1, 0],
  N: [-1, 0],
};

let N, M, R;
const originBoard = [[]];
const board = [[]];
const commands = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M, R] = line.split(" ").map(Number);
  } else if (board.length !== N + 1) {
    originBoard.push([0, ...line.split(" ").map(Number)]);
    board.push([0, ...line.split(" ").map(Number)]);
  } else {
    commands.push(
      line
        .split(" ")
        .map((c) => (["E", "W", "S", "N"].includes(c) ? c : Number(c)))
    );

    if (commands.length === R * 2) {
      rl.close();
    }
  }
}).on("close", function () {
  let score = 0;

  for (let round = 0; round < R; round++) {
    const [attackRow, attackCol, attackDir] = commands[round * 2];
    const [defenseRow, defenseCol] = commands[round * 2 + 1];

    const queue = [[attackRow, attackCol, board[attackRow][attackCol]]];
    board[attackRow][attackCol] = 0;

    let index = 0;
    while (queue.length > index) {
      const [row, col, height] = queue[index++];
      score += 1;

      for (let i = 0; i < height; i++) {
        const [dr, dc] = dirs[attackDir];
        const nr = row + dr * i;
        const nc = col + dc * i;

        if (nr > N || nc > M || nr <= 0 || nc <= 0) {
          continue;
        }

        if (board[nr][nc] === 0) {
          continue;
        }

        queue.push([nr, nc, board[nr][nc]]);
        board[nr][nc] = 0;
      }
    }

    board[defenseRow][defenseCol] = originBoard[defenseRow][defenseCol];
  }

  console.log(score);
  console.log(
    board
      .slice(1)
      .map((row) =>
        row
          .slice(1)
          .map((col) => (col === 0 ? "F" : "S"))
          .join(" ")
      )
      .join("\n")
  );
});
