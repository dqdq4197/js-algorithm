const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let edges = [];
let parents = [];

function getParent(num) {
  if (parents[num] === num) return num;
  return (parents[num] = getParent(parents[num]));
}
function unionParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);
  if (aParent > bParent) parents[aParent] = bParent;
  else parents[bParent] = aParent;
}

function kruskal() {
  let sum = 0;
  let cnt = 0;
  for (let i = 0; i < edges.length; i++) {
    const [a, b, cost] = edges[i];

    if (getParent(a) !== getParent(b)) {
      sum += cost;
      unionParent(a, b);
      cnt += 1;
    }
    if (cnt === N - 1) return sum;
  }
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
    parents = Array.from({ length: N + 1 }, (_, i) => i);
  } else if (!M) {
    M = +line;
  } else {
    edges.push(line.split(" ").map((n) => +n));

    if (--M === 0) {
      edges.sort((a, b) => a[2] - b[2]);
      const result = kruskal();
      console.log(result);
      rl.close();
    }
  }
}).on("close", function () {
  process.exit();
});
