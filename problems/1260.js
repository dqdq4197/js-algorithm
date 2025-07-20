/**
 * 백준 - dfs / bfs
 * https://www.acmicpc.net/problem/1260
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M, V;
let graph;

function dfs(start, visit = new Set(), result = []) {
  visit.add(start);
  result.push(start);

  for (const next of graph[start]) {
    if (!visit.has(next)) {
      dfs(next, visit, result);
    }
  }

  return result.join(" ");
}

function bfs(start) {
  const visit = new Set();
  const queue = [start];
  const result = [];

  visit.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const next of graph[node]) {
      if (!visit.has(next)) {
        queue.push(next);
        visit.add(next);
      }
    }
  }

  return result.join(" ");
}

rl.on("line", function (line) {
  if (!N) {
    [N, M, V] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [from, to] = line.split(" ").map(Number);

    graph[from].push(to);
    graph[to].push(from);

    if (--M === 0) {
      for (let i = 1; i <= N; i++) {
        graph[i].sort((a, b) => a - b);
      }

      rl.close();
    }
  }
}).on("close", function () {
  console.log(dfs(V));
  console.log(bfs(V));
  process.exit();
});
