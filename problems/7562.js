/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/7562
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T, L;
let currentPos;
let goalPos;
const dx = [2, 2, 1, 1, -1, -1, -2, -2];
const dy = [-1, 1, 2, -2, 2, -2, 1, -1];

function bfs() {
  const visit = Array.from({ length: L }, () => Array(L).fill(false));
  const [cx, cy] = currentPos;
  visit[cy][cx] = true;

  const queue = [[cx, cy, 0]];

  while (queue.length) {
    const [x, y, count] = queue.shift();

    if (x === goalPos[0] && y === goalPos[1]) {
      return count;
    }

    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= L || ny >= L) {
        continue;
      }

      if (visit[ny][nx]) {
        continue;
      }

      visit[ny][nx] = true;
      queue.push([nx, ny, count + 1]);
    }
  }
}

rl.on("line", function (line) {
  if (T === undefined) {
    T = +line;
  } else if (L === undefined) {
    L = +line;
  } else if (currentPos === undefined) {
    currentPos = line.split(" ").map(Number);
  } else {
    goalPos = line.split(" ").map(Number);

    console.log(bfs());
    if (--T === 0) {
      rl.close();
    } else {
      L = currentPos = goalPos = undefined;
    }
  }
}).on("close", function () {
  process.exit();
});
