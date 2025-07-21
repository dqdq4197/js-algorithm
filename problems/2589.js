/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/2589
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let map = [];
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    map.push(line.split(""));

    if (map.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  let answer = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === "L") {
        const visit = Array.from({ length: N }, () => Array(M).fill(false));
        visit[i][j] = true;
        const queue = [[j, i, 0]];

        let index = 0;
        while (queue.length > index) {
          const [x, y, dist] = queue[index++];

          answer = Math.max(dist, answer);

          for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || ny < 0 || nx >= M || ny >= N) {
              continue;
            }

            if (visit[ny][nx] || map[ny][nx] === "W") {
              continue;
            }

            visit[ny][nx] = true;
            queue.push([nx, ny, dist + 1]);
          }
        }
      }
    }
  }

  console.log(answer);
  process.exit();
});
