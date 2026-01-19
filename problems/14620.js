/**
 * 백준 - 완전탐색
 * https://www.acmicpc.net/problem/14620
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dc = [0, 0, 1, -1];
const dr = [1, -1, 0, 0];
let N;
let visit = [];
let answer = Infinity;
const grid = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    visit = Array.from({ length: N }, () => Array(N).fill(false));
  } else {
    grid.push(line.split(" ").map(Number));

    if (grid.length === N) {
      backtracking(1, 1, 0, 0);
      console.log(answer);
      rl.close();
    }
  }
});

function backtracking(row, col, count, cost) {
  if (answer <= cost) {
    return;
  }

  if (count === 3) {
    answer = cost;
    return;
  }

  for (let r = row; r < N - 1; r++) {
    const colStart = r === row ? col : 1;

    for (let c = colStart; c < N - 1; c++) {
      if (!canPlant(r, c)) {
        continue;
      }

      let nextCost = cost + plant(r, c, true);
      backtracking(r, c + 1, count + 1, nextCost);
      plant(r, c, false);
    }
  }
}

function canPlant(r, c) {
  if (visit[r][c]) {
    return false;
  }

  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i];
    const nc = c + dc[i];

    if (visit[nr][nc]) {
      return false;
    }
  }

  return true;
}

function plant(r, c, isPlanting) {
  let cost = grid[r][c];
  visit[r][c] = isPlanting;

  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i];
    const nc = c + dc[i];

    visit[nr][nc] = isPlanting;
    cost += grid[nr][nc];
  }

  return cost;
}
