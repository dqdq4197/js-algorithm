/**
 * 백준 - 최소 스패닝 트리 / 크루스칼
 * https://www.acmicpc.net/problem/14621
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
let university;
const edges = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else if (!university) {
    university = line.split(" ");
  } else {
    edges.push(line.split(" ").map(Number));

    if (--M === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  edges.sort((a, b) => a[2] - b[2]);

  let connectedCount = 0;
  let cost = 0;
  const uf = new UnionFind(N);

  for (const edge of edges) {
    const [u, v, d] = edge;

    if (university[u - 1] === university[v - 1]) {
      continue;
    }

    if (uf.union(u, v)) {
      cost += d;
      connectedCount += 1;
    }

    if (connectedCount === N - 1) {
      break;
    }
  }

  console.log(connectedCount === N - 1 ? cost : -1);
});
