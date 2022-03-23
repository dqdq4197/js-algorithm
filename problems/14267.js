const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let childs;
let DP = [];

function dfs(i) {
  childs[i].forEach((child) => {
    DP[child] += DP[i];
    dfs(child);
  });
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
    DP = Array.from({ length: N + 1 }, () => 0);
  } else if (!childs) {
    const parents = [0, ...line.split(" ").map((n) => +n)];

    childs = Array.from({ length: N + 1 }, () => []);
    for (let i = 1; i < parents.length; i++) {
      if (parents[i] !== -1) childs[parents[i]].push(i);
    }
  } else {
    const [i, w] = line.split(" ").map((n) => +n);

    DP[i] += w;
    if (--M === 0) {
      dfs(1);
      console.log(DP.slice(1).join(" "));
      rl.close();
    }
  }
});
