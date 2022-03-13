const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n, m;
let graph = [];
const INF = Infinity;

rl.on("line", function (line) {
  if (!n) {
    n = +line;
    graph = Array.from({ length: n }, () => Array(n).fill(INF));
  } else if (!m) m = +line;
  else {
    const [a, b, c] = line.split(" ").map((n) => +n);

    if (graph[a - 1][b - 1] > c) graph[a - 1][b - 1] = c;

    if (--m === 0) {
      for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (graph[i][k] !== INF && graph[k][j] !== INF)
              graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
          }
        }
      }

      const result = [];
      for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
          if (i === j || graph[i][j] === INF) {
            row.push(0);
          } else row.push(graph[i][j]);
        }
        result.push(row.join(" "));
      }
      console.log(result.join("\n"));
      rl.close();
    }
  }
});
