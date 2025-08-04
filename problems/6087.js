/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/6087
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let W, H;
let start, end;
let map = [];
//          상, 하, 좌, 우
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

rl.on("line", function (line) {
  if (!W) {
    [W, H] = line.split(" ").map(Number);
  } else {
    const row = line.split("");
    map.push(row);

    for (let i = 0; i < W; i++) {
      const cell = row[i];

      if (cell === "C") {
        const pos = [i, map.length - 1];
        if (!start) {
          start = pos;
        } else {
          end = pos;
        }
      }
    }

    if (map.length === H) {
      rl.close();
    }
  }
}).on("close", function () {
  const [sx, sy] = start;
  const [ex, ey] = end;
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Array(4).fill(Infinity))
  );

  visited[sy][sx] = Array(4).fill(0);
  const queue = Array.from({ length: 4 }, (_, i) => [sx, sy, i]);

  let index = 0;
  while (queue.length > index) {
    const [x, y, dir] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= W || ny >= H) {
        continue;
      }

      if (map[ny][nx] === "*") {
        continue;
      }

      const cost = visited[y][x][dir];
      const nCost = dir === i ? cost : cost + 1;

      if (visited[ny][nx][i] <= nCost) {
        continue;
      }

      visited[ny][nx][i] = nCost;
      queue.push([nx, ny, i]);
    }
  }

  let result;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (y === ey && x === ex) {
        result = Math.min(...visited[y][x]);
      }
    }
  }

  console.log(result);

  process.exit();
});
