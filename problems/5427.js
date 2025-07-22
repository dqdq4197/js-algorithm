/**
 * 백준 - bfs / 구현
 * https://www.acmicpc.net/problem/5427
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T, W, H;
let map;
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function solution() {
  const fireQueue = [];
  const posQueue = [];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (map[y][x] === "*") {
        fireQueue.push([x, y, map[y][x], 0]);
      }

      if (map[y][x] === "@") {
        posQueue.push([x, y, map[y][x], 0]);
      }
    }
  }
  const queue = [...fireQueue, ...posQueue];

  let index = 0;
  while (queue.length > index) {
    const [x, y, op, dist] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (op === "*") {
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) {
          continue;
        }

        if (map[ny][nx] !== "@" && map[ny][nx] !== ".") {
          continue;
        }

        map[ny][nx] = "*";
        queue.push([nx, ny, map[ny][nx], dist + 1]);
      }

      if (op === "@") {
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) {
          return dist + 1;
        }

        if (map[ny][nx] !== ".") {
          continue;
        }

        map[ny][nx] = "@";
        queue.push([nx, ny, map[ny][nx], dist + 1]);
      }
    }
  }

  return "IMPOSSIBLE";
}

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (!W) {
    [W, H] = line.split(" ").map(Number);
    map = [];
  } else {
    map.push(line.split(""));

    if (H === map.length) {
      console.log(solution());

      if (--T === 0) {
        rl.close();
      } else {
        W = H = undefined;
      }
    }
  }
}).on("close", function () {
  process.exit();
});
