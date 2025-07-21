/**
 * 백준 - bfs / 구현
 * https://www.acmicpc.net/problem/18405
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, K;
let S, X, Y;
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const map = [];
const viruses = [];

rl.on("line", function (line) {
  if (!N) {
    [N, K] = line.split(" ").map(Number);
  } else {
    if (map.length === N) {
      [S, X, Y] = line.split(" ").map(Number);

      rl.close();
    } else {
      const row = line.split(" ").map(Number);
      map.push(row);
      const y = map.length - 1;

      row.forEach((num, x) => {
        if (num !== 0) {
          viruses.push([num, 0, x, y]);
        }
      });
    }
  }
}).on("close", function () {
  viruses.sort((a, b) => a[0] - b[0]);

  while (viruses.length) {
    const [num, time, x, y] = viruses.shift();

    if (time === S) {
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) {
        continue;
      }

      if (map[ny][nx] === 0) {
        map[ny][nx] = num;
        viruses.push([num, time + 1, nx, ny]);
      }
    }
  }

  console.log(map[X - 1][Y - 1]);
  process.exit();
});
