/**
 * 백준 - dfs
 * https://www.acmicpc.net/problem/24479
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M, R;
let graph = [];
let visited;
let orderArray;

rl.on("line", function (line) {
  if (!N) {
    [N, M, R] = line.split(" ").map(Number);
    visited = Array.from({ length: N + 1 }, () => false);
    graph = Array.from({ length: N + 1 }, () => []);
    orderArray = Array.from({ length: N + 1 }, () => 0);
  } else {
    const [u, v] = line.split(" ").map(Number);
    graph[u].push(v);
    graph[v].push(u);

    if (--M === 0) {
      dfs(R, 1);
      console.log(orderArray.slice(1).join("\n"));
      rl.close();
    }
  }
});

let order = 1;

function dfs(node) {
  orderArray[node] = order++;
  visited[node] = true;

  graph[node].sort((a, b) => a - b);

  for (const next of graph[node]) {
    if (!visited[next]) {
      dfs(next);
    }
  }
}
