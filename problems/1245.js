/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/1245
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];

let N, M;
const farm = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    farm.push(line.split(" ").map(Number));

    if (farm.length === N) {
      let count = 0;
      const visit = Array.from({ length: N }, () => Array(M).fill(false));

      for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
          if (visit[y][x]) continue;

          visit[y][x] = true;
          const queue = [[y, x]];
          const h = farm[y][x];
          let flag = false;

          let index = 0;
          while (queue.length > index) {
            const [r, c] = queue[index++];

            for (let i = 0; i < 8; i++) {
              const nr = r + dr[i];
              const nc = c + dc[i];

              if (nr < 0 || nc < 0 || nr >= N || nc >= M) {
                continue;
              }

              const nh = farm[nr][nc];

              if (h < nh) {
                flag = true;
              }

              if (visit[nr][nc] || h !== nh) {
                continue;
              }

              visit[nr][nc] = true;
              queue.push([nr, nc]);
            }
          }

          if (!flag) {
            count += 1;
          }
        }
      }

      console.log(count);

      rl.close();
    }
  }
});
