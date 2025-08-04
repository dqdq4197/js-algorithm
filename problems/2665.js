/**
 * 백준 - bfs / 다익스트라
 * https://www.acmicpc.net/problem/2665
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let graph = [];
let dist = [];
let N;
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    graph.push(line.split("").map(Number));
    dist.push(line.split("").map(() => Infinity));

    if (graph.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  dist[0][0] = 0;
  const queue = [[0, 0]];

  let index = 0;
  while (queue.length > index) {
    let [x, y] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
        continue;
      }

      const nDist = graph[nx][ny] === 0 ? dist[x][y] + 1 : dist[x][y];

      if (nDist >= dist[nx][ny]) {
        continue;
      }

      dist[nx][ny] = nDist;
      queue.push([nx, ny]);
    }
  }

  console.log(dist[N - 1][N - 1]);
  process.exit();
});
