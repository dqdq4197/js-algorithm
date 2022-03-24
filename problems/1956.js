const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let V, E;
let graph = [];
const INF = Infinity;
let result = INF;

rl.on("line", function (line) {
  if (!V) {
    [V, E] = line.split(" ").map((n) => +n);
    graph = Array.from({ length: V + 1 }, () => Array(V + 1).fill(INF));
  } else {
    const [a, b, c] = line.split(" ").map((n) => +n);
    graph[a][b] = c;
    if (--E === 0) rl.close();
  }
}).on("close", function () {
  for (let k = 1; k <= V; k++) {
    for (let i = 1; i <= V; i++) {
      for (let j = 1; j <= V; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
        if (i === j) result = Math.min(result, graph[i][j]);
      }
    }
  }
  console.log(result === INF ? -1 : result);
  process.exit();
});
