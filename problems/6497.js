/**
 * 백준 - 최소 스패닝 트리 / 크루스칼
 * https://www.acmicpc.net/problem/6497
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

let N, M;
let edges;
let totalCost;

rl.on("line", function (line) {
  if (!M) {
    [M, N] = line.split(" ").map(Number);

    if (M === 0 && N === 0) {
      rl.close();
    }

    edges = [];
    totalCost = 0;
  } else {
    const [x, y, z] = line.split(" ").map(Number);

    totalCost += z;
    edges.push([x, y, z]);

    if (edges.length === N) {
      edges.sort((a, b) => a[2] - b[2]);

      const uf = new UnionFind(M);
      let connectedCount = 0;
      let minCost = 0;

      for (const edge of edges) {
        const [a, b, cost] = edge;

        if (uf.union(a, b)) {
          connectedCount += 1;
          minCost += cost;
        }

        if (connectedCount === M - 1) {
          break;
        }
      }

      console.log(totalCost - minCost);

      M = N = undefined;
    }
  }
});
