/**
 * 백준 - bfs / 트리
 * https://www.acmicpc.net/problem/30893
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, S, E;
let graph;
let visit;
let parents;

rl.on("line", function (line) {
  if (!N) {
    [N, S, E] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
    visit = Array(N + 1).fill(false);
    parents = Array(N + 1).fill(0);
  } else {
    const [u, v] = line.split(" ").map(Number);

    graph[u].push(v);
    graph[v].push(u);

    if (--N === 1) {
      rl.close();
    }
  }
}).on("close", function () {
  visit[S] = true;
  const queue = [S];

  let index = 0;
  while (queue.length > index) {
    const v = queue[index++];

    for (const nv of graph[v]) {
      if (visit[nv]) continue;

      visit[nv] = true;
      parents[nv] = v;
      queue.push(nv);
    }
  }

  const path = [];

  let n = E;
  while (n !== 0) {
    path.push(n);
    n = parents[n];
  }
  path.reverse();

  let result = "First";

  for (let i = 1; i < path.length - 1; i++) {
    const v = path[i];

    if (i % 2 === 1 && graph[v].length > 2) {
      result = "Second";
      break;
    }
  }

  console.log(result);
});
