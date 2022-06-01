const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let visit = [];
let result = [0, 0]; // W, B

function dfs(y, x, color) {
  visit[y][x] = true;

  let cnt = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (visit[ny][nx] || color !== input[ny][nx]) continue;
    cnt += dfs(ny, nx, color);
  }

  return cnt;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    visit = Array.from({ length: M }, () => Array(N).fill(false));
  } else {
    input.push(line.split(""));

    if (input.length === M) {
      for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
          if (!visit[i][j]) {
            const color = input[i][j];
            const cnt = dfs(i, j, color);
            if (color === "W") {
              result[0] += Math.pow(cnt, 2);
            } else {
              result[1] += Math.pow(cnt, 2);
            }
          }
        }
      }

      console.log(result.join(" "));
      rl.close();
    }
  }
});
