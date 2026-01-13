/**
 * 백준 - unionFind
 * https://www.acmicpc.net/problem/16562
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class UnionFind {
  constructor(n, minCosts) {
    this.parents = Array.from({ length: n + 1 }, (_, i) => i);
    this.minCosts = [0, ...minCosts];
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

    if (this.minCosts[aParent] > this.minCosts[bParent]) {
      this.parents[aParent] = bParent;
    } else {
      this.parents[bParent] = aParent;
    }

    return true;
  }
}

let N, M, K;
let costs;
const friends = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M, K] = line.split(" ").map(Number);
  } else if (!costs) {
    costs = line.split(" ").map(Number);
  } else {
    friends.push(line.split(" ").map(Number));

    if (friends.length === M) {
      rl.close();
    }
  }
}).on("close", function () {
  const uf = new UnionFind(N, costs);

  for (const [v, w] of friends) {
    uf.union(v, w);
  }

  let totalCost = 0;

  for (let i = 1; i <= N; i++) {
    if (uf.parents[i] === i) {
      totalCost += uf.minCosts[i];
    }
  }

  if (K < totalCost) {
    console.log("Oh no");
  } else {
    console.log(totalCost);
  }

  process.exit();
});
