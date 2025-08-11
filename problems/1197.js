/**
 * 백준 - 크루스칼
 * https://www.acmicpc.net/problem/1197
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let V, E;
let edges = [];

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

rl.on("line", function (line) {
  if (!V) {
    [V, E] = line.split(" ").map(Number);
  } else {
    edges.push(line.split(" ").map(Number));

    if (edges.length === E) {
      rl.close();
    }
  }
}).on("close", function () {
  edges.sort((a1, a2) => a1[2] - a2[2]);

  let sum = 0;
  let count = 0;
  const unionFind = new UnionFind(V);

  for (let i = 0; i < E; i++) {
    const [a, b, cost] = edges[i];

    if (unionFind.union(a, b)) {
      sum += cost;
      count += 1;
    }

    if (count === V - 1) {
      break;
    }
  }

  console.log(sum);

  process.exit();
});
