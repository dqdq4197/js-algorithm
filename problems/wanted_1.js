const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let costs;
let p = 0;
let nCnt = 0;
let discount = [];
let result = Infinity;

function dfs(sum, cp_costs, cnt) {
  if (cnt === N) result = Math.min(result, sum);
  for (let i = 1; i <= N; i++) {
    if (cp_costs[i] === 0) continue;
    let nCosts = cp_costs.slice();
    nCosts[i] = 0;

    for (let j = 0; j < discount[i].length; j++) {
      const [n, cost] = discount[i][j];
      if (nCosts[n] === 0) continue;
      if (nCosts[n] - cost < 1) nCosts[n] = 1;
      else nCosts[n] -= cost;
    }
    dfs(sum + cp_costs[i], nCosts, cnt + 1);
  }
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    discount = Array.from({ length: N + 1 }, () => []);
  } else if (!costs) {
    costs = [0, ...line.split(" ").map((n) => +n)];
  } else if (p === 0) {
    p = +line;
    nCnt += 1;
  } else {
    const input = line.split(" ").map((n) => +n);
    p -= 1;
    discount[nCnt].push(input);
  }
}).on("close", function () {
  dfs(0, costs, 0);
  console.log(result);
  process.exit();
});
