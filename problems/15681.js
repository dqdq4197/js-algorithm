const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, R, Q;
let tree = [];
let childs = [];
let visit = [];
const result = [];

function dfs(node) {
  if (visit[node]) return 0;
  visit[node] = true;
  if (childs[node]) return childs[node];
  tree[node].forEach((nNode) => {
    childs[node] += dfs(nNode);
  });
  return childs[node] + 1;
}

rl.on("line", function (line) {
  if (N === undefined) {
    [N, R, Q] = line.split(" ").map(Number);
    tree = Array.from({ length: N + 1 }, () => []);
    childs = Array.from({ length: N + 1 }, () => 0);
    visit = Array.from({ length: N + 1 }, () => false);
  } else if (N > 1) {
    const [U, V] = line.split(" ").map(Number);
    tree[U].push(V);
    tree[V].push(U);
    if (--N === 1) dfs(R);
  } else {
    const U = +line;
    result.push(childs[U] + 1);
    if (--Q === 0) {
      console.log(result.join("\n"));
      rl.close();
    }
  }
});
