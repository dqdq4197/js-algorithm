/**
 * 백준 - 그래프 / 최단거리
 * https://www.acmicpc.net/problem/23352
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let grid = [];
const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    grid.push(line.split(" ").map(Number));

    if (grid.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  let maxDist = 0;
  let maxSum = 0;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      const startRoomNum = grid[r][c];

      if (startRoomNum === 0) continue;

      const [endRoomNum, dist] = search([r, c]);
      const sum = startRoomNum + endRoomNum;

      if (dist === 0) continue;
      if (maxDist > dist) continue;

      if (maxDist < dist) {
        maxSum = sum;
        maxDist = dist;
      } else {
        maxSum = Math.max(maxSum, sum);
      }
    }
  }

  console.log(maxSum);
});

function search(start) {
  const visit = Array.from({ length: N }, () => Array(M).fill(false));
  const queue = [[...start, 0]];

  let index = 0;
  while (queue.length > index) {
    const [r, c, dist] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr < 0 || nc < 0 || nr >= N || nc >= M) {
        continue;
      }

      if (visit[nr][nc] || grid[nr][nc] === 0) {
        continue;
      }

      visit[nr][nc] = true;
      queue.push([nr, nc, dist + 1]);
    }
  }

  const [endR, endC, dist] = queue[index - 1];
  return [grid[endR][endC], dist];
}
