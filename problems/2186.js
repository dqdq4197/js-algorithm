const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M, K;
let chars = [];
let word = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let DP = [];
let result = 0;

function dfs(y, x, index) {
  if (word.length - 1 === index) return (DP[y][x][index] = 1);
  if (DP[y][x][index] !== -1) return DP[y][x][index];

  DP[y][x][index] = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= K; j++) {
      const nx = x + dx[i] * j;
      const ny = y + dy[i] * j;
      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      if (chars[ny][nx] === word[index + 1]) {
        DP[y][x][index] += dfs(ny, nx, index + 1);
      }
    }
  }

  return DP[y][x][index];
}

rl.on("line", function (line) {
  if (!N) {
    [N, M, K] = line.split(" ").map((n) => +n);
  } else if (chars.length !== N) {
    chars.push(line.split(""));
  } else {
    word = line.split("");
    DP = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => Array(word.length).fill(-1))
    );
    rl.close();
  }
}).on("close", function () {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (word[0] === chars[i][j]) {
        result += dfs(i, j, 0);
      }
    }
  }
  console.log(result);
  process.exit();
});
