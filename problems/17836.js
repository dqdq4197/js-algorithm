/**
 * 백준 - BFS
 * https://www.acmicpc.net/problem/17836
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
let N, M, T;
let grid = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M, T] = line.split(" ").map(Number);
  } else {
    grid.push(line.split(" ").map(Number));

    if (grid.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  const times = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(Infinity))
  );
  times[0][0][0] = 0;
  const queue = [[0, 0, 0]];

  let index = 0;
  while (queue.length > index) {
    const [x, y, hasKnife] = queue[index++];
    const currentTime = times[y][x][hasKnife];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) {
        continue;
      }

      if (!hasKnife && grid[ny][nx] === 1) {
        continue;
      }

      const nextHasKnife = hasKnife || grid[ny][nx] === 2 ? 1 : 0;

      if (times[ny][nx][nextHasKnife] <= currentTime + 1) {
        continue;
      }

      times[ny][nx][nextHasKnife] = currentTime + 1;
      queue.push([nx, ny, nextHasKnife]);
    }
  }

  const minTime = Math.min(times[N - 1][M - 1][0], times[N - 1][M - 1][1]);
  console.log(minTime > T ? "Fail" : minTime);
});
