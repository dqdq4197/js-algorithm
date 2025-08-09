/**
 * 백준 - 플로이드 워셜
 * https://www.acmicpc.net/problem/11780
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
    N = +line;
    dist = Array.from({ length: N }, (_, start) =>
      Array.from({ length: N }, (_, end) => (start === end ? 0 : Infinity))
    );

    path = Array.from({ length: N }, () => Array.from({ length: N }, () => []));
  } else if (!M) {
    M = +line;
  } else {
    const [a, b, c] = line.split(" ").map(Number);
    dist[a - 1][b - 1] = Math.min(c, dist[a - 1][b - 1]);

    if (--M === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          path[i][j] = [...path[i][k], k + 1, ...path[k][j]];
        }
      }
    }
  }

  dist = dist.map((row) => row.map((col) => (col === Infinity ? 0 : col)));

  console.log(dist.map((row) => row.join(" ")).join("\n"));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (dist[i][j] === 0) {
        console.log(0);
      } else {
        console.log(
          [path[i][j].length + 2, i + 1, ...path[i][j], j + 1].join(" ")
        );
      }
    }
  }

  process.exit();
});
