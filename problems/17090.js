const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];
const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0]; // U R D L
const dir = { U: 0, R: 1, D: 2, L: 3 };
let dp = [];
let visit = [];

function dfs(y, x) {
  if (dp[y][x]) return true;

  const nDir = dir[input[y][x]];
  const nx = x + dx[nDir];
  const ny = y + dy[nDir];

  if (!visit[y][x]) {
    visit[y][x] = true;
    if (nx < 0 || ny < 0 || nx >= M || ny >= N) {
      dp[y][x] = true;
    } else {
      dp[y][x] = dfs(ny, nx);
    }
  }
  return dp[y][x];
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    dp = Array.from({ length: N }, () => Array(M).fill(false));
    visit = Array.from({ length: N }, () => Array(M).fill(false));
  } else {
    input.push(line.split(""));

    if (input.length === N) {
      let result = 0;

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          const isPossible = dfs(i, j);
          result += isPossible ? 1 : 0;
        }
      }

      console.log(result);
      rl.close();
    }
  }
});
