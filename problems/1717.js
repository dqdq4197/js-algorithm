/**
 * 백준 - unionFind
 * https://www.acmicpc.net/problem/1717
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
let result = [];
let uf;

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    uf = new UnionFind(N);
  } else {
    const [command, a, b] = line.split(" ").map(Number);

    if (command === 0) {
      uf.union(a, b);
    }

    if (command === 1) {
      result.push(uf.find(a) === uf.find(b) ? "YES" : "NO");
    }

    if (--M === 0) {
      console.log(result.join("\n"));
      rl.close();
    }
  }
});
