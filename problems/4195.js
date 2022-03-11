const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let F;
let uf;
let result = [];

function unionFind() {
  this.parents = new Set();
  this.childs = new Set();

  this.getParent = (name) => {
    if (this.parents[name] == name) return name;
    return (this.parents[name] = this.getParent(this.parents[name]));
  };

  this.unionParent = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    if (aParent !== bParent) {
      this.parents[bParent] = aParent;
      this.childs[aParent] += this.childs[bParent];
    }
  };
}

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (F === undefined) {
    F = +line;
    uf = new unionFind();
  } else {
    const [from, to] = line.split(" ");

    if (!uf.parents[from]) {
      uf.parents[from] = from;
      uf.childs[from] = 1;
    }

    if (!uf.parents[to]) {
      uf.parents[to] = to;
      uf.childs[to] = 1;
    }

    uf.unionParent(from, to);
    result += uf.childs[uf.getParent(from)] + "\n";
    if (--F === 0) {
      F = undefined;
      if (--T === 0) {
        console.log(result);
        rl.close();
      }
    }
  }
});
