/**
 * 백준 - 최대 신장 트리 (크루스칼) / bfs
 * https://www.acmicpc.net/problem/28019
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class UnionFind {
  constructor(n) {
    this.parents = Array.from({ length: n + 1 }, (_, i) => i);
  }

  find(node) {
    if (this.parents[node] === node) return node;
    return (this.parents[node] = this.find(this.parents[node]));
  }

  union(a, b) {
    const aParent = this.find(a);
    const bParent = this.find(b);

    if (aParent === bParent) {
      return false;
    }

    if (aParent > bParent) {
      this.parents[aParent] = bParent;
    } else {
      this.parents[bParent] = aParent;
    }

    return true;
  }

  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}

let N, M;
let S;
let edges = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else if (edges.length !== M) {
    edges.push(line.split(" ").map(Number));
  } else {
    S = +line;
    rl.close();
  }
}).on("close", function () {
  edges.sort((a, b) => b[2] - a[2]);

  const unionFind = new UnionFind(N);
  const graph = Array.from({ length: N + 1 }, () => []);

  let totalCost = 0;
  let connectedEdgesCount = 0;

  for (let i = 0; i < M; i++) {
    const [a, b, cost] = edges[i];

    if (unionFind.union(a, b)) {
      totalCost += cost;
      connectedEdgesCount += 1;
      graph[a].push([b, cost]);
      graph[b].push([a, cost]);
    }

    if (connectedEdgesCount === N - 1) {
      break;
    }
  }

  const dist = Array.from({ length: N + 1 }, () => -1);

  dist[S] = 0;
  const queue = [S];

  let index = 0;
  while (queue.length > index) {
    const cur = queue[index++];

    for (const [next, cost] of graph[cur]) {
      const nextTotalCost = dist[cur] + cost;

      if (dist[next] === -1) {
        dist[next] = dist[cur] + cost;
        queue.push(next);
      }
    }
  }

  const maxCost = Math.max(...dist);

  console.log(totalCost * 2 - maxCost);
});

function dfs() {}
