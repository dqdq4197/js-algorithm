/**
 * 백준 - 크루스칼 / bfs
 * https://www.acmicpc.net/problem/23034
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
}

let N, M, Q;
const edges = [];
const questions = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else if (edges.length < M * 2) {
    const [u, v, cost] = line.split(" ").map(Number);
    edges.push([u, v, cost]);
    edges.push([v, u, cost]);
  } else if (!Q) {
    Q = +line;
  } else {
    questions.push(line.split(" ").map(Number));

    if (--Q === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  edges.sort((a, b) => a[2] - b[2]);

  let mstCost = 0;
  let connectedCount = 0;
  const mstGraph = Array.from({ length: N + 1 }, () => []);
  const unionFind = new UnionFind(N);

  for (const [u, v, cost] of edges) {
    if (unionFind.union(u, v)) {
      mstGraph[u].push([v, cost]);
      mstGraph[v].push([u, cost]);
      mstCost += cost;
      connectedCount += 1;
    }

    if (connectedCount === N - 1) {
      break;
    }
  }

  for (const question of questions) {
    const [start, end] = question;
    const visit = Array.from({ length: N + 1 }, () => false);

    visit[start] = true;
    const queue = [[start, 0]];

    let maxCostResult = 0;
    let index = 0;
    while (queue.length > index) {
      const [cur, maxCost] = queue[index++];

      if (cur === end) {
        maxCostResult = maxCost;
        break;
      }

      for (const [next, cost] of mstGraph[cur]) {
        if (visit[next]) {
          continue;
        }

        const nextMaxCost = Math.max(maxCost, cost);
        visit[next] = true;
        queue.push([next, nextMaxCost]);
      }
    }

    console.log(mstCost - maxCostResult);
  }

  process.exit();
});
