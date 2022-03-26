const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let TC;
let N, M, W;
let graph = [];
const INF = Infinity;
let result = [];

function bf() {
  const dist = Array.from({ length: N + 1 }, () => INF);
  dist[1] = 0;
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        const cost = graph[i][j];
        if (dist[i] !== INF && dist[j] > dist[i] + cost) {
          dist[j] = dist[i] + cost;

          if (i === N) return true;
        }
      }
    }
  }

  return false;
}

rl.on("line", function (line) {
  if (!TC) TC = +line;
  else if (N === undefined) {
    [N, M, W] = line.split(" ").map((n) => +n);
    graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(INF));
  } else if (M !== 0) {
    M -= 1;
    const [S, E, T] = line.split(" ").map((n) => +n);
    if (graph[S][E] > T) {
      graph[S][E] = T;
      graph[E][S] = T;
    }
  } else {
    const [S, E, T] = line.split(" ").map((n) => +n);

    if (graph[S][E] > -1 * T) {
      graph[S][E] = -1 * T;
    }

    if (--W === 0) {
      TC -= 1;
      result.push(bf() ? "YES" : "NO");
      if (TC === 0) {
        console.log(result.join("\n"));
        rl.close();
      }
      // reset
      N = undefined;
      edges = [];
    }
  }
});
