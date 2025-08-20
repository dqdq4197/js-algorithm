/**
 * 백준 - dfs
 * https://www.acmicpc.net/problem/4963
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let W, H;
let map;
const dx = [0, 1, 1, 1, 0, -1, -1, -1];
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
let visited;

rl.on("line", function (line) {
  if (!W) {
    [W, H] = line.split(" ").map(Number);

    if (W === 0 && H === 0) {
      rl.close();
    }

    map = [];
    visited = Array.from({ length: H }, () => Array(W).fill(false));
  } else {
    map.push(line.split(" ").map(Number));

    if (map.length === H) {
      let count = 0;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (map[y][x] === 0 || visited[y][x]) continue;

          visited[y][x] = true;
          dfs(x, y);
          count += 1;
        }
      }
      console.log(count);

      W = H = undefined;
    }
  }
});

function dfs(x, y) {
  for (let i = 0; i < 8; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= W || ny >= H) {
      continue;
    }

    if (visited[ny][nx] || map[ny][nx] === 0) continue;

    visited[ny][nx] = true;
    dfs(nx, ny);
  }
}
