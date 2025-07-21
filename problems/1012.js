/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/1012
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T, M, N, K, land, flags;

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

function bfs() {
  let count = 0;
  const visit = Array.from({ length: N }, () => Array(M).fill(false));

  for (const [x, y] of flags) {
    if (visit[y][x]) {
      continue;
    }

    count++;
    const queue = [[x, y]];
    visit[y][x] = true;

    while (queue.length > 0) {
      const [cx, cy] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= M || ny < 0 || ny >= N) {
          continue;
        }

        if (!visit[ny][nx] && land[ny][nx] === 1) {
          visit[ny][nx] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }

  return count;
}

rl.on("line", function (line) {
  if (T === undefined) {
    T = +line;
  } else if (M === undefined) {
    [M, N, K] = line.split(" ").map(Number);
    land = Array.from({ length: N }, () => Array(M).fill(0));
    flags = [];
  } else {
    const [X, Y] = line.split(" ").map(Number);
    land[Y][X] = 1;
    flags.push([X, Y]);

    if (--K === 0) {
      console.log(bfs());
      if (--T === 0) {
        rl.close();
      } else {
        M = N = K = undefined;
      }
    }
  }
}).on("close", function () {
  process.exit();
});
