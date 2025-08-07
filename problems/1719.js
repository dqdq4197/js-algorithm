/**
 * 백준 - 플로이드 워셜
 * https://www.acmicpc.net/problem/1719
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let dist;
let path;

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    dist = Array.from({ length: N }, (_, rowIndex) =>
      Array.from({ length: N }, (_, colIndex) =>
        rowIndex === colIndex ? 0 : Infinity
      )
    );
    path = Array.from({ length: N }, () => Array(N).fill("-"));
  } else {
    const [u, v, cost] = line.split(" ").map(Number);
    const [from, to] = [u - 1, v - 1];
    dist[from][to] = dist[to][from] = cost;
    path[to][from] = u;
    path[from][to] = v;

    if (--M === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (dist[i][j] > dist[i][k] + dist[j][k]) {
          dist[i][j] = dist[i][k] + dist[j][k];
          path[i][j] = path[i][k];
        }
      }
    }
  }

  console.log(path.map((row) => row.join(" ")).join("\n"));
  process.exit();
});
