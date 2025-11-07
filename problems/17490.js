/**
 * 백준 - 크루스칼
 * https://www.acmicpc.net/problem/17490
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class UnionFind {
  constructor(n, costs) {
    this.parents = Array.from({ length: n }, (_, i) => i);
    this.costs = costs;
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

    if (this.costs[aParent] > this.costs[bParent]) {
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

let N, M, K;
let costs;
const brokenEdges = new Set();

rl.on("line", function (line) {
  if (!N) {
    [N, M, K] = line.split(" ").map(Number);
  } else if (!costs) {
    costs = [0, ...line.split(" ").map(Number)];
  } else {
    const [from, to] = line.split(" ").map(Number);
    brokenEdges.add(`${from}-${to}`);
    brokenEdges.add(`${to}-${from}`);

    if (--M === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  const uf = new UnionFind(N + 1, costs);

  for (let i = 1; i <= N; i++) {
    const from = i;
    let to = (i + 1) % (N + 1);
    to = to === 0 ? 1 : to;

    if (brokenEdges.has(`${from}-${to}`)) {
      continue;
    }

    uf.union(from, to);
  }

  let totalCost = 0;
  let connectedCount = 0;

  for (let i = 1; i <= N; i++) {
    if (uf.find(i) === i) {
      totalCost += costs[i];
      connectedCount += 1;
    }
  }

  console.log(connectedCount === 1 || totalCost <= K ? "YES" : "NO");
  process.exit();
});
