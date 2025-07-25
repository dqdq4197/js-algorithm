/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/16918
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R, C, N;
let grid = [];
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

rl.on("line", function (line) {
  if (!N) {
    [R, C, N] = line.split(" ").map(Number);
  } else {
    grid.push(line.split("").map((k) => (k === "O" ? 1 : ".")));

    if (grid.length === R) {
      rl.close();
    }
  }
}).on("close", function () {
  let time = 1;
  while (time++ < N) {
    for (let y = 0; y < R; y++) {
      for (let x = 0; x < C; x++) {
        if (time % 2 === 0) {
          // 폭 깔기
          if (grid[y][x] === ".") {
            grid[y][x] = 1;
          } else {
            grid[y][x] += 1;
          }
        }

        if (time % 2 === 1) {
          // 폭 터트리기
          if (grid[y][x] === 2) {
            for (let i = 0; i < 4; i++) {
              const nx = x + dx[i];
              const ny = y + dy[i];

              if (nx < 0 || ny < 0 || nx >= C || ny >= R) {
                continue;
              }

              if (grid[ny][nx] === 2 && (nx > x || ny > y)) {
                continue;
              }

              grid[ny][nx] = ".";
            }

            grid[y][x] = ".";
            continue;
          }

          if (grid[y][x] === ".") {
            continue;
          }
        }
      }
    }
  }

  console.log(converter(grid));
  process.exit();
});

function converter(grid) {
  return grid
    .map((row) =>
      row.map((col) => (typeof col === "number" ? "O" : col)).join("")
    )
    .join("\n");
}
