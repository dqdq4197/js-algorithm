const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let rowIndex = 0;
let edges = [];
let totalLen = 0;

function unionFind(n) {
  this.parents = Array.from({ length: n }, (_, i) => i);

  this.getParent = (a) => {
    if (a === this.parents[a]) return a;
    return (this.parents[a] = this.getParent(this.parents[a]));
  };

  this.unionParent = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    if (aParent > bParent) this.parents[aParent] = bParent;
    else this.parents[bParent] = aParent;
  };

  this.find = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    return aParent === bParent;
  };
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    line.split("").forEach((char, i) => {
      if (char !== "0") {
        let code = char.charCodeAt();
        if (code <= 90) {
          code -= 38;
        } else {
          code -= 96;
        }
        edges.push([rowIndex, i, code]);
        totalLen += code;
      }
    });
    if (++rowIndex === N) {
      const uf = new unionFind(N);
      edges.sort((a, b) => a[2] - b[2]);

      let result = 0;
      for (let i = 0; i < edges.length; i++) {
        const [from, to, cost] = edges[i];
        if (!uf.find(from, to)) {
          uf.unionParent(from, to);
          result += cost;
        }
      }

      let flag = false;
      for (let i = 1; i < N; i++) {
        if (!uf.find(0, i)) {
          flag = true;
          break;
        }
      }

      if (flag) console.log(-1);
      else console.log(totalLen - result);

      rl.close();
    }
  }
});
