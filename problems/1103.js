// DP + dfs문제
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let board = [];
let costs = [];
let visit = [];
let isCycle = false;
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function dfs(y, x) {
  if (x < 0 || y < 0 || x >= M || y >= N) return 0;
  if (board[y][x] === "H") return 0;
  if (visit[y][x]) {
    isCycle = true;
    return 0;
  }
  if (costs[y][x]) return costs[y][x];
  visit[y][x] = true;

  const X = +board[y][x];
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i] * X;
    const ny = y + dy[i] * X;

    costs[y][x] = Math.max(dfs(ny, nx) + 1, costs[y][x]);
  }
  visit[y][x] = false;
  return costs[y][x];
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    costs = Array.from({ length: N }, () => Array(M).fill(0));
    visit = Array.from({ length: N }, () => Array(M).fill(false));
  } else {
    board.push(line.split(""));
    if (board.length === N) {
      dfs(0, 0, 0);
      console.log(isCycle ? -1 : costs[0][0]);

      rl.close();
    }
  }
});
