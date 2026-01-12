/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/34218
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let N, M;
let grid = [];
let start, end;

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else if (grid.length < N) {
    grid.push(line.split(" ").map(Number));
  } else if (start === undefined) {
    start = line.split(" ").map((n) => +n - 1);
  } else if (end === undefined) {
    end = line.split(" ").map((n) => +n - 1);

    rl.close();
  }
}).on("close", function () {
  marking(start, 2);

  if (grid[end[0]][end[1]] === 2) {
    // 걸어서 도착
    console.log(0);
    process.exit();
  }

  marking(end, 3);

  let answer = Infinity;
  const costs = Array.from({ length: N }, () => Array(M).fill(Infinity));
  costs[start[0]][start[1]] = 0;

  const queue = [start];
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) {
        continue;
      }

      const nextCost = costs[y][x] + 1;

      if (grid[ny][nx] === 2 && costs[ny][nx] !== 0) {
        costs[ny][nx] = 0;
        queue.push([ny, nx]);
        continue;
      }

      if (costs[ny][nx] <= nextCost) {
        continue;
      }

      costs[ny][nx] = nextCost;
      queue.push([ny, nx]);

      if (grid[ny][nx] === 3) {
        answer = Math.min(answer, nextCost);
      }
    }
  }

  console.log(answer);
  process.exit();
});

function marking(start, mark) {
  const queue = [start];
  grid[start[0]][start[1]] = mark;
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) {
        continue;
      }

      if (grid[ny][nx] !== 1) {
        continue;
      }

      grid[ny][nx] = mark;
      queue.push([ny, nx]);
    }
  }
}
