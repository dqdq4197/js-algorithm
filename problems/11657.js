const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let edges = [];
let dist = [];
const INF = Infinity;

function bf() {
  dist[1] = 0;
  for (let i = 1; i <= N; i++) {
    for (let j = 0; j < M; j++) {
      const [start, end, cost] = edges[j];

      if (dist[end] > cost + dist[start]) {
        dist[end] = cost + dist[start];

        if (i === N) return true;
      }
    }
  }

  return false;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
    dist = Array.from({ length: N + 1 }, () => INF);
  } else {
    edges.push(line.split(" ").map((n) => +n));
    if (edges.length === M) {
      const isInf = bf(1);
      if (isInf) console.log(-1);
      else {
        console.log(
          dist
            .map((n) => (n === INF ? -1 : n))
            .slice(2)
            .join("\n")
        );
      }
      rl.close();
    }
  }
});
