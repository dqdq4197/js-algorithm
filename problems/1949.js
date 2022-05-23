const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let DP;
let tree = [];
let visit = [];
const ROOT = 1;

function dfs(node) {
  visit[node] = true;

  tree[node].forEach((nNode) => {
    if (!visit[nNode]) {
      dfs(nNode);
      DP[node][0] += DP[nNode][1];
      DP[node][1] += Math.max(...DP[nNode]);
    }
  });
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    tree = Array.from({ length: N + 1 }, () => []);
    visit = Array.from({ length: N + 1 }, () => false);
  } else if (!DP) {
    DP = [0, ...line.split(" ").map((n) => [+n, 0])];
  } else {
    const [u, v] = line.split(" ").map(Number);
    tree[u].push(v);
    tree[v].push(u);

    if (--N === 1) {
      dfs(ROOT);
      console.log(Math.max(...DP[ROOT]));
      rl.close();
    }
  }
});
