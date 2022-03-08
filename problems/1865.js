const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let TC;
let N, M, W;
let edges = [];
let dist = [];
let result = "";

function bf(start) {
  dist[start] = 0;

  for (let i = 1; i <= N; i++) {
    for (let j = 0; j < edges.length; j++) {
      const [cur, nextNode, cost] = edges[j];

      if (dist[nextNode] > dist[cur] + cost) {
        dist[nextNode] = dist[cur] + cost;

        if (i === N) return true;
      }
    }
  }

  return false;
}

rl.on("line", function (line) {
  if (!TC) TC = +line;
  else if (N === undefined) {
    [N, M, W] = line.split(" ").map((n) => +n);
    dist = Array.from({ length: N + 1 }, () => Infinity);
  } else if (M !== 0) {
    M -= 1;
    const [S, E, T] = line.split(" ").map((n) => +n);
    edges.push([S, E, T]);
    edges.push([E, S, T]);
  } else {
    const [S, E, T] = line.split(" ").map((n) => +n);
    edges.push([S, E, -1 * T]);

    if (--W === 0) {
      console.log(edges, dist, N);
      result += (bf(1) ? "YES" : "NO") + "\n";
      TC -= 1;
      if (TC === 0) {
        console.log(result);
        rl.close();
      }
      // reset
      N = undefined;
      edges = [];
    }
  }
});
