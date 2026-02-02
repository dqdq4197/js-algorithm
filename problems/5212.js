/**
 * 백준 - 구현
 * https://www.acmicpc.net/problem/5212
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];
let R, C;
let grid = [];

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map(Number);
  } else {
    grid.push(line.split(""));

    if (grid.length === R) {
      rl.close();
    }
  }
}).on("close", function () {
  const newGrid = grid.map((row) => row.slice());

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === ".") {
        continue;
      }

      let count = 0;
      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (nr < 0 || nc < 0 || nr >= R || nc >= C) {
          count += 1;
          continue;
        }

        if (grid[nr][nc] === ".") {
          count += 1;
        }
      }

      if (count >= 3) {
        newGrid[r][c] = ".";
      }
    }
  }

  let minR = R;
  let maxR = -1;
  let minC = C;
  let maxC = -1;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (newGrid[r][c] === "X") {
        minR = Math.min(minR, r);
        maxR = Math.max(maxR, r);
        minC = Math.min(minC, c);
        maxC = Math.max(maxC, c);
      }
    }
  }

  for (let r = minR; r <= maxR; r++) {
    console.log(newGrid[r].slice(minC, maxC + 1).join(""));
  }
});
