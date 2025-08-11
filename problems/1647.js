/**
 * 백준 - 최소 스패닝 트리 (크루스칼)
 * https://www.acmicpc.net/problem/1647
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let edges = [];

class UnionFind {
  constructor(n) {
    this.parents = Array.from({ length: n + 1 }, (_, i) => i);
  }

  find(node) {
    if (this.parents[node] === node) return node;
    else return (this.parents[node] = this.find(this.parents[node]));
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

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    edges.push(line.split(" ").map(Number));

    if (edges.length === M) {
      rl.close();
    }
  }
}).on("close", function () {
  edges.sort((a, b) => a[2] - b[2]);

  let totalCost = 0;
  let connectedEdgesCount = 0;
  const unionFind = new UnionFind(N);

  for (let i = 0; i < M; i++) {
    const [a, b, cost] = edges[i];

    if (connectedEdgesCount === N - 2) {
      break;
    }

    if (unionFind.union(a, b)) {
      totalCost += cost;
      connectedEdgesCount += 1;
    }
  }

  console.log(totalCost);
});
