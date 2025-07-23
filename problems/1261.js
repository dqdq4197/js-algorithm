/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/1261
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let W, H;
let map = [];
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

rl.on("line", function (line) {
  if (!W) {
    [W, H] = line.split(" ").map(Number);
  } else {
    map.push(line.split("").map(Number));

    if (map.length === H) {
      rl.close();
    }
  }
}).on("close", function () {
  const costs = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Infinity)
  );

  costs[0][0] = 0;
  const queue = [[0, 0, 0]];

  let index = 0;
  while (queue.length > index) {
    const [x, y, cost] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= W || ny >= H) {
        continue;
      }

      const nCnt = map[ny][nx] === 1 ? cost + 1 : cost;

      if (costs[ny][nx] > nCnt) {
        costs[ny][nx] = nCnt;
        queue.push([nx, ny, nCnt]);
      }
    }
  }

  console.log(costs[H - 1][W - 1]);

  process.exit();
});
