/**
 * 백준 - unionFind
 * https://www.acmicpc.net/problem/18116
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class UnionFind {
  constructor(n) {
    this.parents = Array.from({ length: n + 1 }, (_, i) => i);
    this.count = Array.from({ length: n + 1 }, () => 1);
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
      this.count[bParent] += this.count[aParent];
    } else {
      this.parents[bParent] = aParent;
      this.count[aParent] += this.count[bParent];
    }

    return true;
  }

  getCount(node) {
    return this.count[this.find(node)];
  }
}

let N;
let uf = new UnionFind(Math.pow(10, 6));
let result = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    const [command, a, b] = line.split(" ").map((v, i) => (i > 0 ? +v : v));

    if (command === "I") {
      uf.union(a, b);
    }

    if (command === "Q") {
      result.push(uf.getCount(a));
    }

    if (--N === 0) {
      console.log(result.join("\n"));
      rl.close();
    }
  }
});
