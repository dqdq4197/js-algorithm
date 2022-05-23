const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let tree = [];
let visit = [];
let dp = [];

function dfs(node) {
  visit[node] = true;
  dp[node][0] = 1;
  tree[node].forEach((nNode) => {
    if (!visit[nNode]) {
      const [a, b] = dfs(nNode);
      dp[node][1] += a;
      dp[node][0] += Math.min(a, b);
    }
  });

  return dp[node];
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    tree = Array.from({ length: N + 1 }, () => []);
    visit = Array.from({ length: N + 1 }, () => false);
    dp = Array.from({ length: N + 1 }, () => Array(2).fill(0));
  } else {
    const [u, v] = line.split(" ").map(Number);
    tree[u].push(v);
    tree[v].push(u);
    if (--N === 1) {
      dfs(1);
      console.log(Math.min(...dp[1]));
      rl.close();
    }
  }
});
